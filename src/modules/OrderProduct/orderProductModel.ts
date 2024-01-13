import { Schema, Types, model } from "mongoose";
import { TOrder, TProduct } from "./orderProductInterface";

const productSchema = new Schema<TProduct>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  size: { type: String },
  quantity: { type: Number },
  color: { type: String },
});

const orderSchema = new Schema<TOrder>({
  email: { type: String },
  product: [productSchema],
  name: { type: String, required: [true, "Name is required!"] },
  phone: { type: String, required: [true, "Phone is required!"] },
  totalPrice: {
    type: Number,
  },
});

export const Order = model<TOrder>("Order", orderSchema);
