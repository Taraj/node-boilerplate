import { BaseError } from '../baseError';

export class AuthException extends BaseError {
    code!: number;
    error!: string
    constructor(msg: string) {
        super(msg);
        this.code = 401;
        this.error = 'Unauthorized';
    }
}