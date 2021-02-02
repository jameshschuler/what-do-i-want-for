import camelcaseKeys from 'camelcase-keys';
import { StatusCodes } from 'http-status-codes';
import supabase from '../db/supabaseClient';
import { TableNames } from '../db/tableNames';
import { isNumeric } from '../helpers/isNumeric';
import { AppError } from '../models/appError';
import { WantListResponse } from '../models/response/wantListResponse';

export default class ListService {
    public async getList ( id: string ): Promise<WantListResponse | null> {
        let response;

        if ( isNumeric( id ) ) {
            response = await supabase.from( TableNames.WantList ).select( '*' )
                .eq( 'want_list_id', id ).limit( 1 );
        } else {
            response = await supabase.from( TableNames.WantList ).select( '*' )
                .eq( 'special_id', id ).limit( 1 );
        }

        if ( response.error || !response.data || response.data.length === 0 ) {
            throw new AppError( 'No matching list found.', StatusCodes.NOT_FOUND )
        }

        return camelcaseKeys( response.data[ 0 ] );
    }
}