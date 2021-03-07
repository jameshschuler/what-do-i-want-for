import { WantListItem } from './wantListItem';

export interface WantList {
    want_list_id: number;
    name: string;
    special_id: string;
    created_by: string;
    created_at: string;
    published: boolean;
    want_list_item: WantListItem[];
    published_by: string;
    published_at: string;
    updated_at: string;
    updated_by: string;
}