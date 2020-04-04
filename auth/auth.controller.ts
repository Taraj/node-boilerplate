import { Response, Application, Router, NextFunction, Request } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import authService from './auth.service';


const router: Router = Router();

export const AuthController = (app: Application) => {
    router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto: LoginDto = req.body;
            res.send(await authService.login(dto));
        } catch (err) {
            next(err);
        };
    });

    router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto: RegisterDto = req.body;
            res.send(await authService.register(dto));
        } catch (err) {
            next(err);
        };
    });

    app.use('/auth', router);
}

