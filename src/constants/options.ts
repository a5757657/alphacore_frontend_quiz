import { optionType } from "@/types/app/table";

const fulfillmentOptions: optionType[] = [
  { label: "已出貨", value: "received" },
  { label: "準備中", value: "preparing" }
];

const orderStatusOptions: optionType[] = [
  { label: "已開啟", value: "open" },
  { label: "已取消", value: "cancelled" },
  { label: "已關閉", value: "closed" }
];

const financialStatusOptions: optionType[] = [
  { label: "已付款", value: "paid" },
  { label: "未付款", value: "pending" },
  { label: "已退款", value: "refunded" }
];

const cityOptions: optionType[] = [
  { label: "台北市", value: "台北市" },
  { label: "新北市", value: "新北市" },
  { label: "新竹市", value: "新竹市" },
  { label: "台南市", value: "台南市" },
  { label: "高雄市", value: "高雄市" }
];

export { fulfillmentOptions, orderStatusOptions, financialStatusOptions, cityOptions };
