import { StatusCodes } from 'http-status-codes';
import supabase from '../db/supabaseClient';
import { TableNames } from '../db/tableNames';
import { WantListItem } from '../entities/wantListItem';
import { AppError } from '../models/appError';
import { ClaimListItemRequest } from '../models/request/claimListItemRequest';
import { CreateListItemRequest } from '../models/request/createListItemRequest';
import { WantListItemResponse } from '../models/response/wantListItemResponse';

export default class ListItemService {

    public async createListItem ( listId: number, request: CreateListItemRequest ) {
        const { want_list_id: existingListId, published } = await this.getList( listId );

        if ( published ) {
            throw new AppError( 'List has already been published and cannot be modified.',
                StatusCodes.UNPROCESSABLE_ENTITY );
        }

        await supabase.from<WantListItem>( TableNames.WantListItem ).insert( {
            want_list_id: existingListId,
            value: request.value,
            link: request.link
        } );
    }

    public async getListItems ( listId: number ) {
        const { want_list_id: existingListId, } = await this.getList( listId );

        const response = await supabase.from<WantListItem>( TableNames.WantListItem ).select( '*' )
            .eq( 'want_list_id', existingListId );

        return response.data?.map( ( listItem: WantListItem ) => WantListItemResponse.convert( listItem ) );
    }

    public async claimListItem ( listId: number, listItemId: number, request: ClaimListItemRequest ) {
        if ( request.claimedBy === '' ) {
            request.claimedBy = 'anonymous';
        }

        const { data, error } = await supabase
            .from<WantListItem>( TableNames.WantListItem )
            .update( {
                claimed_by: request.claimedBy,
                is_claimed: true,
            } )
            .eq( 'want_list_id', listId )
            .eq( 'want_list_item_id', listItemId )
            .not( 'is_claimed', 'eq', true );

        if ( error || !data ) {
            throw new AppError( 'Unable to claim list item. Please try again.', StatusCodes.BAD_REQUEST );
        }
    }

    private async getList ( listId: number ): Promise<any> {
        const { data, error } = await supabase.from( TableNames.WantList ).select( 'want_list_id, published' )
            .eq( 'want_list_id', listId );

        if ( error || !data || data.length === 0 ) {
            throw new AppError( 'No matching list found.', StatusCodes.NOT_FOUND );
        }

        return data[ 0 ];
    }
}