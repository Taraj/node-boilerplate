import { Response, NextFunction, Request } from 'express';
import { AuthException } from '../errors/exceptions/authException';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        next(new AuthException('Only for logged users'));
    }
}

export const isNotAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next(new AuthException('Only for unlogged users'));
    } else {
        next();
    }
}