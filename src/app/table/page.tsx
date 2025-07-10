"use client";

import { useEffect, useState } from "react";

import { Backdrop, CircularProgress } from "@mui/material";
import { Divider, FormControl, InputLabel, MenuItem, Paper, Select } from "@mui/material";

import CusPagination from "@/components/CusPagination";
import Filter from "@/components/Filter";

import useOrder from "@/hooks/useGetOrders";

import { type FilterType, OrderData, PageSetting, SortType } from "@/types/app/table";

import Result from "./Result";

const sortByOptions = [
  { label: "訂單建立時間", value: "created_at" },
  { label: "訂單編號", value: "order_name" },
  { label: "金額", value: "total_price" },
  { label: "配送日期", value: "delivery_date" },
  { label: "配送地址", value: "receiver_address" }
];

const Page = () => {
  const [orderData, setOrderData] = useState<OrderData[]>([]);
  const [pageSetting, setPageSetting] = useState<PageSetting>({
    total_pages: 0,
    size: 20,
    total_elements: 0,
    page: 0
  });
  const [sortBy, setSortBy] = useState<SortType>("created_at");
  const [filter, setFilter] = useState<FilterType>({
    receiver_address: "",
    delivery_date: null,
    order_status: "",
    financial_status: "",
    fulfillment_status: "",
    city: []
  });
  const { data, isLoading } = useOrder(pageSetting, sortBy, filter);

  const handleReset = () => {
    setFilter({
      receiver_address: "",
      delivery_date: null,
      order_status: "",
      financial_status: "",
      fulfillment_status: "",
      city: []
    });
  };

  useEffect(() => {
    if (!isLoading && data) {
      setOrderData(data.content);
      setPageSetting({
        total_pages: data.total_pages,
        size: data.size,
        total_elements: data.total_elements,
        page: data.pageable.page_number > data.total_pages ? 0 : data.pageable.page_number
      });
    }
  }, [isLoading, data]);

  return (
    <div className="flex flex-col gap-4">
      <Filter filterData={filter} setFilterData={setFilter} reset={handleReset} />
      <Paper sx={{ mx: "auto", width: "100%" }}>
        <div className="flex justify-between items-center p-2 flex-wrap gap-4">
          <FormControl variant="standard" size="small" sx={{ width: 150 }}>
            <InputLabel id="demo-simple-select-label">排序依據</InputLabel>
            <Select label="排序依據" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              {sortByOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <CusPagination pageSetting={pageSetting} setPageSetting={setPageSetting} />
        </div>
        <Divider />
        <Result orderData={orderData} isLoading={isLoading} />
        <Divider />
        <div className="flex justify-end items-center p-2 flex-wrap gap-4">
          <CusPagination pageSetting={pageSetting} setPageSetting={setPageSetting} />
        </div>
      </Paper>
      <Backdrop
        invisible={true}
        open={isLoading}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Page;
