import { BaseError } from '../baseError';

export class PageNotFound extends BaseError {
    code!: number;
    error!: string
    constructor(msg: string) {
        super(msg);
        this.code = 404;
        this.error = 'Page Not Found';
    }
}