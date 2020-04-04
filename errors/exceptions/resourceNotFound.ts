import { BaseError } from '../baseError';

export class ResourceNotFound extends BaseError {
    code!: number;
    error!: string
    constructor(msg: string) {
        super(msg);
        this.code = 404;
        this.error = 'Resource Not Found';
    }
}