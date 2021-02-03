import Joi from 'joi';

export interface CreateListItemRequest {
    listId: number;
    value: string;
    link: string;
}

export const createListItemRequestSchema = Joi.object( {
    listId: Joi.number().positive().required(),
    value: Joi.string().min( 1 ).max( 250 ).required(),
    link: Joi.string(),
} );