import { Request, Response, NextFunction } from 'express';
import { BaseError } from './baseError';

export default async (err: BaseError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.code || 500;
    let error = err.error || 'Internal Server Error'

    console.log(err);

    res.status(statusCode).contentType('text/json').end(JSON.stringify({
        timestamp: (new Date()).toISOString(),
        status: statusCode,
        error: error,
        message: err.message,
        path: req.path
    }));
};