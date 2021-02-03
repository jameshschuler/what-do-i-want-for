import { StatusCodes } from 'http-status-codes';
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

        return data !== null && data[ 0 ] !== null ? data[ 0 ].want_list_id : null;
    }

    public async getList ( id: string, includeItems?: boolean ): Promise<WantListResponse | null> {
        let response;

        let q =
            `want_list_id,    
            name,
            created_by,
            created_at,
            special_id`;

        if ( includeItems ) {
            q +=
                `,want_list_item (
                created_at,
                link,
                value,
                want_list_item_id,
                is_claimed)`
        }

        if ( isNumeric( id ) ) {
            response = await supabase.from<WantList>( TableNames.WantList ).select( q )
                .eq( 'want_list_id', id ).single();
        } else {
            response = await supabase.from<WantList>( TableNames.WantList ).select( q )
                .eq( 'special_id', id ).single();
        }

        const { error, data } = response;

        if ( error || !data ) {
            throw new AppError( 'No matching list found.', StatusCodes.NOT_FOUND )
        }

        return WantListResponse.convert( data );
    }
}