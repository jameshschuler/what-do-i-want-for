import { WantListItem } from './wantListItem';

export interface WantList {
    want_list_id: number;
    name: string;
    special_id: string;
    created_by: string;
    created_at: string;
    want_list_item: WantListItem[]
}