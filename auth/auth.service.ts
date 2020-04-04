import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/authResponse.dto';
import bcrypt from 'bcrypt';
import { User } from '../users/user.model';
import { AuthException } from '../errors/exceptions/authException'
import { LoginEntry } from '../users/loginEntry.model';
import { Config } from '../config';
import Crypto from 'crypto';


class AuthService {

    public async login(dto: LoginDto): Promise<AuthResponseDto> {
        const user: User | undefined = await User.query().findOne({ email: dto.email });
        if (user == undefined) {
            throw new AuthException('Not found');
        }
        if (!(await bcrypt.compare(dto.password, user.password))) {
            throw new AuthException('Not found');
        }

        return this.createAuthResponse(user);
    }

    public async register(dto: RegisterDto): Promise<AuthResponseDto> {
        const user: User | undefined = await User.query().findOne({ email: dto.email });
        if (user != undefined) {
            throw new AuthException('User already exist');
        }

        const newUser: User = await User.query().insert({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: await bcrypt.hash(dto.password, 10)
        });

        return this.createAuthResponse(newUser);
    }

    private async createAuthResponse(user: User): Promise<AuthResponseDto> {
        const loginEntry: LoginEntry = await this.getLoginEntry(user);
        return {
            token: loginEntry.token,
            firstName: user.firstName,
            lastName: user.lastName
        }
    }

    private async getLoginEntry(user: User): Promise<LoginEntry> {
        const loginEntry: LoginEntry | undefined = await user.$relatedQuery('loginEntries').findOne('expiryDate', '>', new Date());
        if (loginEntry == undefined) {
            return await user.$relatedQuery('loginEntries').insertAndFetch({
                token: Crypto.randomBytes(Config.TOKEN_SIZE).toString('hex'),
                expiryDate: new Date(new Date().getTime() + Config.TOKEN_EXPIRATION_DATE),
                creationDate: new Date()
            });
        }
        return await loginEntry.$query().patchAndFetch({
            expiryDate: new Date(new Date().getTime() + Config.TOKEN_EXPIRATION_DATE),
        });
    }


}


export default new AuthService();