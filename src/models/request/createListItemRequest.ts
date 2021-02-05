import Joi from 'joi';

export interface CreateListItemRequest {
    value: string;
    link: string;
}

export const createListItemRequestSchema = Joi.object( {
    value: Joi.string().min( 1 ).max( 250 ).required(),
    link: Joi.string(),
} );