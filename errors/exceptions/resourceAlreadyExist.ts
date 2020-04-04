import { BaseError } from '../baseError';

export class ResourceAlreadyExist extends BaseError {
    code!: number;
    error!: string
    constructor(msg: string) {
        super(msg);
        this.code = 409;
        this.error = 'Conflict';
    }
}