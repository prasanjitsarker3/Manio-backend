import { Types } from "mongoose";

type Product = {
  product: Types.ObjectId;
  size: string;
  quantity: number;
  color: string;
};

export type TOrder = {
  email: string;
  product: Product[];
  name: string;
  phone: string;
};
