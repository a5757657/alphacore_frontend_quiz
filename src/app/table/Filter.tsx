import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { zhTW } from "date-fns/locale";

import { type FilterType } from "./page";

interface option {
  label: string;
  value: string;
}

const fulfillmentOptions: option[] = [
  { label: "已出貨", value: "received" },
  { label: "準備中", value: "preparing" }
];

const orderStatusOptions: option[] = [
  { label: "已開啟", value: "open" },
  { label: "已取消", value: "cancelled" },
  { label: "已關閉", value: "closed" }
];

const financialStatusOptions: option[] = [
  { label: "已付款", value: "paid" },
  { label: "未付款", value: "pending" },
  { label: "已退款", value: "refunded" }
];

const cityOptions: option[] = [
  { label: "台北市", value: "台北市" },
  { label: "新北市", value: "新北市" },
  { label: "新竹市", value: "新竹市" },
  { label: "台南市", value: "台南市" },
  { label: "高雄市", value: "高雄市" }
];

const Filter = ({
  filterData,
  setFilterData
}: {
  filterData: FilterType;
  setFilterData: (data: FilterType) => void;
}) => {

  return (
    <div className="flex flex-wrap gap-4">
      <Autocomplete
        size="small"
        sx={{ width: 150 }}
        value={fulfillmentOptions.find((option) => option.value === filterData.fulfillment_status)}
        options={fulfillmentOptions}
        onChange={(_, value) =>
          setFilterData({ ...filterData, fulfillment_status: value?.value || "" })
        }
        renderInput={(params) => <TextField {...params} label="運送狀態" />}
      />
      <Autocomplete
        size="small"
        sx={{ width: 150 }}
        value={orderStatusOptions.find((option) => option.value === filterData.order_status)}
        options={orderStatusOptions}
        onChange={(_, value) => setFilterData({ ...filterData, order_status: value?.value || "" })}
        renderInput={(params) => <TextField {...params} label="訂單狀態" />}
      />
      <Autocomplete
        size="small"
        sx={{ width: 150 }}
        value={financialStatusOptions.find(
          (option) => option.value === filterData.financial_status
        )}
        options={financialStatusOptions}
        onChange={(_, value) =>
          setFilterData({ ...filterData, financial_status: value?.value || "" })
        }
        renderInput={(params) => <TextField {...params} label="付款狀態" />}
      />
      <LocalizationProvider adapterLocale={zhTW} dateAdapter={AdapterDateFns}>
        <DatePicker
          sx={{ width: 200 }}
          label="運送時間"
          format="yyyy/MM/dd"
          views={["year", "month", "day"]}
          value={filterData.delivery_date}
          onChange={(value: Date | null) => {
            setFilterData({ ...filterData, delivery_date: value });
          }}
          localeText={{
            clearButtonLabel: "清除"
          }}
          slotProps={{
            field: {
              clearable: true
            },
            textField: {
              size: "small",
              endAdornment: <InputAdornment position="end">dsf</InputAdornment>
            }
          }}
        />
      </LocalizationProvider>
      <Autocomplete
        multiple
        size="small"
        disableCloseOnSelect
        sx={{ minWidth: 200 }}
        options={cityOptions}
        value={cityOptions.filter((option) => filterData.city.includes(option.value))}
        onChange={(_, value) => {
          setFilterData({ ...filterData, city: value.map((item) => item.value) });
        }}
        renderInput={(params) => <TextField {...params} label="縣市" />}
      />
    </div>
  );
};

export default Filter;
