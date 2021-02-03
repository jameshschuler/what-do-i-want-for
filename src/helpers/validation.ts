import express from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';

export function validateRequestModel ( request: any, res: express.Response, schema: Joi.ObjectSchema<any>, abortEarly: boolean = false ): boolean {
    const result: Joi.ValidationResult = schema.validate( request, {
        abortEarly: false
    } );

    if ( result.error ) {
        res.statusCode = StatusCodes.BAD_REQUEST;
        res.json( {
            status: StatusCodes.BAD_REQUEST,
            message: 'Validation Error',
            errors: result.error.details.map( ( error: any ) => {
                return {
                    path: error.path[ 0 ],
                    message: error.message,
                    context: error.context
                }
            } )
        } );

        return false;
    }

    return true;
}