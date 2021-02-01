import { StatusCodes } from 'http-status-codes';

export interface CustomError extends Error {
    errors: any;
}

export class AppError extends Error {
    constructor( message: string, public statusCode: StatusCodes ) {
        super( message );
    }
}