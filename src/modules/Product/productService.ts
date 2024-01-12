import { upload } from "./../../utlisFunction/sendImageToCouldinary";
import { uploadImageToCloudinary } from "../../utlisFunction/sendImageToCouldinary";
import { TProduct } from "./productInterface";
import { Product } from "./productModel";
import fs from "fs";

// const createProductIntoDB = async (file: any, payload: TProduct) => {
//   const { price, discount } = payload;
//   const discountPercentage = discount || 0;
//   const discountAmount = (price * discountPercentage) / 100;
//   const discountedPrice = price - discountAmount;
//   const path = file?.path;
//   const { secure_url }: any = await uploadImageToCloudinary(path);
//   const payloadWithDiscount = {
//     ...payload,
//     discountPrice: discountedPrice,
//     image: secure_url,
//   };
//   const result = await Product.create(payloadWithDiscount);
//   return result;
// };

const createProductIntoDB = async (files: any, payload: TProduct) => {
  const { price, discount } = payload;
  const discountPercentage = discount || 0;
  const discountAmount = (price * discountPercentage) / 100;

  const images = await Promise.all(
    files.map(async (file: any) => {
      const { secure_url }: any = await uploadImageToCloudinary(file.path);
      return secure_url;
    })
  );

  const discountedPrice = price - discountAmount;
  const payloadWithDiscount = {
    ...payload,
    discountPrice: discountedPrice,
    image: images,
  };

  const result = await Product.create(payloadWithDiscount);
  files.forEach((file: any) => {
    fs.unlink(file.path, (err: any) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File is Deleted");
      }
    });
  });
  return result;
};

const getAllProductFromDB = async () => {
  const result = await Product.find({ isDeleted: false });
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteProductFromDB,
};
