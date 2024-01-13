import { uploadImageToCloudinary } from "../../utlisFunction/sendImageToCouldinary";
import { TBannerPhoto } from "./bannerInterface";
import { Banner } from "./bannerModel";

const createBannerIntoDB = async (file: any) => {
  const path = file?.path;
  const { secure_url }: any = await uploadImageToCloudinary(path);
  const result = await Banner.create({ image: secure_url });
  return result;
};
const getAllBannerFromDB = async () => {
  const result = await Banner.find();
  return result;
};

const deleteBannerFromDB = async (id: string) => {
  const result = await Banner.findByIdAndDelete(id);
  return result;
};

export const bannerService = {
  createBannerIntoDB,
  getAllBannerFromDB,
  deleteBannerFromDB,
};
