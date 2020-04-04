import { Request, Response, NextFunction } from 'express';
import { User } from '../users/user.model';
import { AuthException } from '../errors/exceptions/authException';
import { LoginEntry } from '../users/loginEntry.model';
import { Config } from '../config';


declare module 'express-serve-static-core' {
    interface Request {
        isAuthenticated: () => boolean;
        getCurrentUser: () => User | undefined;
    }
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const apiKey: string | undefined = req.headers.authorization;
    req.isAuthenticated = () => false;
    req.getCurrentUser = () => undefined;
    if (apiKey != undefined) {
        try {
            const loginEntry: LoginEntry | undefined = await LoginEntry.query().withGraphFetched('user').where('token', '=', apiKey)
                .orderBy('expiryDate', 'DESC')
                .first();

            if (loginEntry == undefined) {
                throw new AuthException('Token not found');
            }

            if (loginEntry.expiryDate < new Date()) {
                throw new AuthException('Token expired');
            }

            await loginEntry.$query().patch({
                expiryDate: new Date(new Date().getTime() + Config.TOKEN_EXPIRATION_DATE)
            })

            req.isAuthenticated = () => true;
            req.getCurrentUser = () => loginEntry.user;
        } catch (err) {
            next(err);
        }
    }
    next();
};

