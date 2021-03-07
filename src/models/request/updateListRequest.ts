import Joi from 'joi';

export interface UpdateListRequest {
    name: string;
    updatedBy: string;
}

export const updateListRequestSchema = Joi.object( {
    name: Joi.string().min( 1 ).max( 250 ),
    updatedBy: Joi.string().min( 1 ).max( 250 ),
} );