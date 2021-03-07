import { WantList } from 'src/entities/wantList';
import { WantListItem } from 'src/entities/wantListItem';
import { WantListItemResponse } from './wantListItemResponse';

export class WantListResponse {
    name: string;
    wantListId: number;
    specialId: string;
    createdBy: string;
    createdAt: string;
    published: boolean;
    wantListItems: WantListItemResponse[];
    updatedAt: string;
    updatedBy: string;

    public static convert ( wantList: WantList ): WantListResponse {
        return {
            name: wantList.name,
            specialId: wantList.special_id,
            createdAt: wantList.created_at,
            createdBy: wantList.created_by,
            wantListId: wantList.want_list_id,
            published: wantList.published,
            wantListItems: wantList.want_list_item?.map( ( e: WantListItem ) => WantListItemResponse.convert( e ) ),
            updatedAt: wantList.updated_at,
            updatedBy: wantList.updated_by
        }
    }
}