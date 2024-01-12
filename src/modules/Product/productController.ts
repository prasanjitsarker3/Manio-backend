import catchAsync from "../../utlisFunction/catchAsync";
import sendResponse from "../../utlisFunction/sendResponse";
import { productService } from "./productService";

// const createProduct = catchAsync(async (req, res) => {
//   console.log(req.file);
//   const result = await productService.createProductIntoDB(req.file, req.body);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Product is created successfully",
//     data: result,
//   });
// });

const createProduct = catchAsync(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files were uploaded.",
    });
  }
  const result = await productService.createProductIntoDB(req.files, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product is created successfully",
    data: result,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await productService.getAllProductFromDB();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "All product fetch successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.getSingleProductFromDB(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product is retreived successfully",
    data: result,
  });
});

const deletedProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product are deleted successfully",
    data: result,
  });
});

export const productController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deletedProduct,
};
