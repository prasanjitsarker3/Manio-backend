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
  name: string;
  phone: string;
  totalPrice?: number;
};
