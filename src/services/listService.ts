import dayjs from 'dayjs';
import { StatusCodes } from 'http-status-codes';
import { UpdateListRequest } from 'src/models/request/updateListRequest';
import supabase from '../db/supabaseClient';
import { TableNames } from '../db/tableNames';
import { WantList } from '../entities/wantList';
import { generateRandomString } from '../helpers/generateRandomString';
import { isNumeric } from '../helpers/isNumeric';
import { AppError } from '../models/appError';
import { CreateListRequest } from '../models/request/createListRequest';
import { WantListResponse } from '../models/response/wantListResponse';

export default class ListService {

    public async createList ( request: CreateListRequest ): Promise<number | null> {
        const { data } = await supabase.from( TableNames.WantList ).insert( {
            name: request.name,
            created_by: request.createdBy,
            special_id: generateRandomString()
        } );

        return data !== null && data[ 0 ] !== null ? data[ 0 ].special_id : null;
    }

    public async getList ( id: string ): Promise<WantListResponse | null> {
        let response;

        if ( isNumeric( id ) ) {
            response = await supabase.from<WantList>( TableNames.WantList ).select( '*' )
                .eq( 'want_list_id', id ).single();
        } else {
            response = await supabase.from<WantList>( TableNames.WantList ).select( '*' )
                .eq( 'special_id', id ).single();
        }

        const { error, data } = response;

        if ( error || !data ) {
            throw new AppError( 'No matching list found.', StatusCodes.NOT_FOUND );
        }

        return WantListResponse.convert( data );
    }

    public async publishList ( listId: number ) {
        const { data, error } = await supabase
            .from<WantList>( TableNames.WantList )
            .update( {
                published: true,
                published_by: 'test_user',
                published_at: dayjs().toISOString()
            } )
            .eq( 'want_list_id', listId )
            .not( 'published', 'eq', true );

        if ( error || !data ) {
            throw new AppError( 'Unable to publish list. Please try again.', StatusCodes.BAD_REQUEST );
        }
    }

    public async updateList ( listId: string, updateListRequest: UpdateListRequest ): Promise<string> {
        const { data, error } = await supabase
            .from<WantList>( TableNames.WantList )
            .update( {
                name: updateListRequest.name,
                updated_by: updateListRequest.updatedBy,
                updated_at: dayjs().toISOString()
            } )
            .eq( 'special_id', listId )
            .not( 'published', 'eq', true );

        if ( error || !data ) {
            throw new AppError( 'Unable to update list. Please try again.', StatusCodes.BAD_REQUEST );
        }

        return listId;
    }
}