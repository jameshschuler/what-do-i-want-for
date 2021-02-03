import { StatusCodes } from 'http-status-codes';
import { WantListItem } from 'src/entities/wantListItem';
import supabase from '../db/supabaseClient';
import { TableNames } from '../db/tableNames';
import { AppError } from '../models/appError';
import { CreateListItemRequest } from '../models/request/createListItemRequest';

export default class ListItemService {

    public async createListItem ( request: CreateListItemRequest ) {
        const response = await supabase.from( TableNames.WantList ).select( 'want_list_id' )
            .eq( 'want_list_id', request.listId )

        if ( response.error || !response.data || response.data.length === 0 ) {
            throw new AppError( 'No matching list found.', StatusCodes.NOT_FOUND );
        }

        const listId = response.data[ 0 ].want_list_id;

        await supabase.from<WantListItem>( TableNames.WantListItem ).insert( {
            want_list_id: listId,
            value: request.value,
            link: request.link
        } );
    }
}