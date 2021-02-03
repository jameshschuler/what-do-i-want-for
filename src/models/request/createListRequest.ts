import Joi from 'joi';

export interface CreateListRequest {
    name: string;
    createdBy: string;
}

export const createListRequestSchema = Joi.object( {
    name: Joi.string().min( 1 ).max( 100 ).required(),
    createdBy: Joi.string().min( 1 ).max( 100 ).required()
} );