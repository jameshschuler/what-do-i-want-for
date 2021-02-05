export interface WantListItem {
    want_list_item_id: number;
    want_list_id: number;
    created_at: string;
    value: string;
    is_claimed: boolean;
    link: string;
    claimed_by: string;
    is_disabled: boolean;
}