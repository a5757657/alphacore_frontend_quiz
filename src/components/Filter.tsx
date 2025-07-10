import { Autocomplete, Button, InputAdornment, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { zhTW } from "date-fns/locale";

import { Logout } from "@/utils/logout";

import { type FilterProps } from "@/types/components/filter";

import {
  cityOptions,
  financialStatusOptions,
  fulfillmentOptions,
  orderStatusOptions
} from "@/constants/options";

const Filter = ({ filterData, setFilterData, reset }: FilterProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-wrap gap-4">
        <Autocomplete
          size="small"
          sx={{ width: 150 }}
          value={
            fulfillmentOptions.find((option) => option.value === filterData.fulfillment_status) ||
            null
          }
          options={fulfillmentOptions}
          onChange={(_, value) =>
            setFilterData({ ...filterData, fulfillment_status: value?.value || "" })
          }
          renderInput={(params) => <TextField {...params} label="運送狀態" />}
        />
        <Autocomplete
          size="small"
          sx={{ width: 150 }}
          value={
            orderStatusOptions.find((option) => option.value === filterData.order_status) || null
          }
          options={orderStatusOptions}
          onChange={(_, value) =>
            setFilterData({ ...filterData, order_status: value?.value || "" })
          }
          renderInput={(params) => <TextField {...params} label="訂單狀態" />}
        />
        <Autocomplete
          size="small"
          sx={{ width: 150 }}
          value={
            financialStatusOptions.find((option) => option.value === filterData.financial_status) ||
            null
          }
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
        <Button sx={{ height: "fit-content" }} variant="contained" color="primary" onClick={reset}>
          重置
        </Button>
      </div>
      <Button sx={{ height: "fit-content" }} variant="contained" color="primary" onClick={Logout}>
        登出
      </Button>
    </div>
  );
};

export default Filter;
