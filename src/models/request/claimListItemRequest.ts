import Joi from 'joi';

export interface ClaimListItemRequest {
    claimedBy: string;
}

export const claimListItemRequestSchema = Joi.object( {
    claimedBy: Joi.string().max( 250 ),
} );