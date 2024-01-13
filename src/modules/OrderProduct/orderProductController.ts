import catchAsync from "../../utlisFunction/catchAsync";
import sendResponse from "../../utlisFunction/sendResponse";
import { orderProductService } from "./orderProductService";

const createOrderUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await orderProductService.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});
const getAllOrder = catchAsync(async (req, res) => {
  const result = await orderProductService.getAllOrder();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "All order fetch successfully",
    data: result,
  });
});

const singleUserOrder = catchAsync(async (req, res) => {
  const { email } = req.query;
  if (!email || typeof email !== "string") {
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  }
  const result = await orderProductService.singleOrderFormDB(email);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Sing order fetch successfully",
    data: result,
  });
});

export const orderController = {
  createOrderUser,
  getAllOrder,
  singleUserOrder,
};
