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
        const existingListId = await this.getList( listId );

        await supabase.from<WantListItem>( TableNames.WantListItem ).insert( {
            want_list_id: existingListId,
            value: request.value,
            link: request.link
        } );
    }

    public async getListItems ( listId: number ) {
        const existingListId = await this.getList( listId );

        const response = await supabase.from<WantListItem>( TableNames.WantListItem ).select( '*' ).eq( 'want_list_id', existingListId );

        return response.data?.map( ( listItem: WantListItem ) => WantListItemResponse.convert( listItem ) );
    }

    public async claimListItem ( listId: number, listItemId: number, request: ClaimListItemRequest ) {
        // TODO:
    }

    private async getList ( listId: number ): Promise<number> {
        const { data, error } = await supabase.from( TableNames.WantList ).select( 'want_list_id' )
            .eq( 'want_list_id', listId )

        if ( error || !data || data.length === 0 ) {
            throw new AppError( 'No matching list found.', StatusCodes.NOT_FOUND );
        }

        return data[ 0 ].want_list_id;
    }
}