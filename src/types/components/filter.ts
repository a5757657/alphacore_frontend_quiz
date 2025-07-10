import { type FilterType } from "@/types/app/table";

export interface FilterProps {
  filterData: FilterType;
  setFilterData: (data: FilterType) => void;
  reset: () => void;
}
