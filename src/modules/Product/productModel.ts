import { Schema, model } from "mongoose";
import { TProduct } from "./productInterface";

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    price: {
      type: Number,
    },
    size: {
      type: [String],
    },
    color: {
      type: [String],
    },
    rating: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    details: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
    },
    image: { type: [String] },
    discountPrice: {
      type: Number,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<TProduct>("Products", productSchema);
