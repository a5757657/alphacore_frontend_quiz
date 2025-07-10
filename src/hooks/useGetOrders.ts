import { format } from "date-fns";
import useSWR from "swr";

import { fetcher } from "@/services/fetcher";

import { type FilterType, type PageSetting, type SortType } from "@/types/app/table";

export default function useOrder(pageSetting: PageSetting, sortBy: SortType, filter: FilterType) {
  const searchParams = new URLSearchParams({
    size: pageSetting.size.toString(),
    page: pageSetting.page.toString(),
    sort_by: sortBy
  });

  if (filter.fulfillment_status) {
    searchParams.append("fulfillment_status", filter.fulfillment_status);
  }

  if (filter.order_status) {
    searchParams.append("order_status", filter.order_status);
  }

  if (filter.financial_status) {
    searchParams.append("financial_status", filter.financial_status);
  }

  if (filter.delivery_date) {
    searchParams.append("delivery_date", format(filter.delivery_date, "yyyy-MM-dd"));
  }

  if (filter.city.length > 0) {
    searchParams.append("city[]", filter.city.join(","));
  }

  const { data, error, isLoading, mutate } = useSWR(`/orders?${searchParams.toString()}`, fetcher);

  return { data, isLoading, isError: error, mutate };
}
