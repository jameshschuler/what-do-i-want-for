import { WantListItem } from 'src/entities/wantListItem';

export class WantListItemResponse {
    createdAt: string;
    isClaimed: boolean;
    value: string;
    wantListItemId: number;
    link: string;

    public static convert ( wantListItem: WantListItem ): WantListItemResponse {
        return {
            createdAt: wantListItem.created_at,
            isClaimed: wantListItem.is_claimed,
            wantListItemId: wantListItem.want_list_item_id,
            value: wantListItem.value,
            link: wantListItem.link
        }
    }
}