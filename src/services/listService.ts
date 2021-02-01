import { StatusCodes } from 'http-status-codes';
import supabase from '../db/supabaseClient';
import { TableNames } from '../db/tableNames';
import { WantList } from '../entities/wantList';
import { AppError } from '../models/appError';
import { WantListResponse } from '../models/response/wantListResponse';

export default class ListService {
    public msg = 'jello'

    // TODO: this should use varchar id or create new endpoint for querying by that field
    public async getList ( id: number ): Promise<WantListResponse | null> {
        if ( id === 0 || isNaN( id ) ) {
            throw new AppError( 'Invalid list identifier', StatusCodes.UNPROCESSABLE_ENTITY )
        }

        const response = await supabase.from<WantList>( TableNames.WantList ).select( '*' )
            .eq( 'want_list_id', id ).limit( 1 );

        if ( response.error || !response.data || response.data.length === 0 ) {
            throw new AppError( 'No matching list found.', StatusCodes.NOT_FOUND )
        }

        const { name } = response.data[ 0 ];

        return {
            name
        };
    }
}