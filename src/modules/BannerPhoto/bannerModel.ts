import { TBannerPhoto } from "./bannerInterface";
import { Schema, model } from "mongoose";

const bannerSchema = new Schema<TBannerPhoto>(
  {
    image: {
      type: String,
      //   required: [true, "Photo is required!"],
    },
  },
  {
    timestamps: true,
  }
);

export const Banner = model<TBannerPhoto>("Banner", bannerSchema);
