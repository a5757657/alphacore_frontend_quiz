"use client";

import { useEffect, useState } from "react";

import { Backdrop, CircularProgress } from "@mui/material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";

import useOrder from "@/hooks/useGetOrders";

import Filter from "./Filter";

const tolocaleString = (number: number) => {
  return `$${number.toLocaleString()}`;
};
const fulfillmentStatus = (status: string) => {
  switch (status) {
    case "received":
      return "已出貨";
    case "preparing":
      return "準備中";
  }
};
const orderStatus = (status: string) => {
  switch (status) {
    case "open":
      return "已開啟";
    case "cancelled":
      return "已取消";
    case "closed":
      return "已關閉";
  }
};
const financialStatus = (status: string) => {
  switch (status) {
    case "paid":
      return "已付款";
    case "pending":
      return "未付款";
    case "refunded":
      return "已退款";
  }
};

const sortByOptions = [
  { label: "訂單建立時間", value: "created_at" },
  { label: "訂單編號", value: "order_name" },
  { label: "金額", value: "total_price" },
  { label: "配送日期", value: "delivery_date" },
  { label: "配送地址", value: "receiver_address" }
];

export interface FilterType {
  receiver_address: string;
  delivery_date: Date | null;
  order_status: string;
  financial_status: string;
  fulfillment_status: string;
  city: string[];
}

const Page = () => {
  const [orderData, setOrderData] = useState([]);
  const [pageSetting, setPageSetting] = useState({
    total_pages: 0,
    size: 20,
    page: 0,
    total_elements: 0
  });
  const [sortBy, setSortBy] = useState("created_at");
  const [filter, setFilter] = useState<FilterType>({
    receiver_address: "",
    delivery_date: null,
    order_status: "",
    financial_status: "",
    fulfillment_status: "",
    city: []
  });
  const { data, isLoading } = useOrder(pageSetting, sortBy, filter);

  useEffect(() => {
    if (!isLoading && data) {
      setOrderData(data.content);
      setPageSetting({
        total_pages: data.total_pages,
        size: data.size,
        total_elements: data.total_elements,
        page: data.pageable.page_number
      });
    }
  }, [isLoading, data]);

  return (
    <div className="flex flex-col gap-4">
      <Filter filterData={filter} setFilterData={setFilter} />
      <Paper sx={{ mx: "auto", width: "100%" }}>
        <div className="flex justify-between p-4 flex-wrap gap-4">
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
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={pageSetting.total_elements}
            page={pageSetting.page}
            onRowsPerPageChange={(e) => {
              setPageSetting({
                ...pageSetting,
                size: Number(e.target.value)
              });
            }}
            onPageChange={() => {}}
            labelRowsPerPage="每頁筆數"
            labelDisplayedRows={() => {
              return (
                <span>{`${pageSetting.page * pageSetting.size + 1} - ${
                  pageSetting.page * pageSetting.size + pageSetting.size
                } 共 ${pageSetting.total_elements} 筆`}</span>
              );
            }}
            rowsPerPage={pageSetting.size}
            ActionsComponent={() => {
              return (
                <Pagination
                  sx={{ "& ul": { flexWrap: "nowrap" } }}
                  count={pageSetting.total_pages}
                  page={pageSetting.page + 1}
                  onChange={(_, page) => {
                    setPageSetting({
                      ...pageSetting,
                      page: page - 1
                    });
                  }}
                />
              );
            }}
          />
        </div>
        <TableContainer
          sx={{
            mx: "auto",
            maxHeight: "calc(100vh - 300px)",
            "& td, th": {
              whiteSpace: "nowrap"
            }
          }}
        >
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>訂單編號</TableCell>
                <TableCell>顧客</TableCell>
                <TableCell>金額</TableCell>
                <TableCell>訂單建立時間</TableCell>
                <TableCell>訂單狀態</TableCell>
                <TableCell>付款狀態</TableCell>
                <TableCell>運送狀態</TableCell>
                <TableCell>配送日期與時段</TableCell>
                <TableCell>配送地址</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{tolocaleString(order.total_price)}</TableCell>
                  <TableCell>{order.created_at}</TableCell>
                  <TableCell>{orderStatus(order.order_status)}</TableCell>
                  <TableCell>{financialStatus(order.financial_status)}</TableCell>
                  <TableCell>{fulfillmentStatus(order.fulfillment_status)}</TableCell>
                  <TableCell>
                    <p>{order.delivery_date}</p>
                    <p>{order.delivery_time}</p>
                  </TableCell>
                  <TableCell>{order.receiver_address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
