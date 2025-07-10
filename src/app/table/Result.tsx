"use client";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { formatCurrency } from "@/utils/formatters";

import { type ResultProps } from "@/types/app/table";

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

const Result = ({ orderData, isLoading }: ResultProps) => {
  return (
    <TableContainer
      sx={{
        mx: "auto",
        maxHeight: "calc(100vh - 260px)",
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
          {orderData.length > 0 ? (
            orderData.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>{formatCurrency(order.total_price)}</TableCell>
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
            ))
          ) : (
            <>
              {!isLoading && (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    查無資料
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Result;
