import { Schema, Types, model } from "mongoose";
import { TOrder, TProduct } from "./orderProductInterface";
import { Product } from "../Product/productModel";

const productSchema = new Schema<TProduct>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  size: { type: String },
  quantity: { type: Number },
  color: { type: String },
});

const orderSchema = new Schema<TOrder>(
  {
    email: { type: String },
    product: [productSchema],
    name: { type: String, required: [true, "Name is required!"] },
    phone: { type: String, required: [true, "Phone is required!"] },
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["checkoutProcess", "deliveryProcess", "orderConfirm"],
      default: "checkoutProcess",
    },
    location: {
      type: String,
      required: [true, "Location is required!"],
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
    },
    orderDate: {
      type: String,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", async function (next) {
  const orderItems = this.product;
  try {
    for (const orderItem of orderItems) {
      const { productId, quantity } = orderItem;
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error(`Product with ID ${productId} not found.`);
      }
      const newStock = product.stock - quantity;
      await Product.findByIdAndUpdate(productId, { stock: newStock });
    }
    next();
  } catch (error) {
    next(error as any);
  }
});

export const Order = model<TOrder>("Order", orderSchema);
