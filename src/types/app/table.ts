export interface FilterType {
  receiver_address: string;
  delivery_date: Date | null;
  order_status: string;
  financial_status: string;
  fulfillment_status: string;
  city: string[];
}

export interface PageSetting {
  total_pages: number;
  size: number;
  page: number;
  total_elements: number;
}

export interface OrderData {
  id: number;
  order_name: string;
  customer_name: string;
  order_status: "open" | "closed" | "cancelled";
  financial_status: "paid" | "pending" | "refunded";
  fulfillment_status: "preparing" | "received";
  created_at: string;
  total_price: number;
  receiver_address: string;
  delivery_date: string;
  note: string;
  delivery_time: string;
  shipping_name: string | null;
  city: string;
  district: string;
  internal_note: string;
}

export interface ResultProps {
  orderData: OrderData[];
  isLoading: boolean;
}

export type SortType =
  | "created_at"
  | "order_name"
  | "total_price"
  | "delivery_date"
  | "receiver_address";

export interface optionType {
  label: string;
  value: string;
}
