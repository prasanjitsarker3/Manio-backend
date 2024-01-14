import { Types } from "mongoose";

export type TProduct = {
  productId: Types.ObjectId;
  size: string;
  quantity: number;
  color: string;
};

export type TOrder = {
  email: string;
  product: TProduct[];
  status?: "checkoutProcess" | "orderConfirm" | "deliveryProcess";
  name: string;
  phone: string;
  totalPrice?: number;
  location?: string;
  orderDate?: string;
  paymentMethod?: "cash" | "online";
};
