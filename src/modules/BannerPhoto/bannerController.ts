import catchAsync from "../../utlisFunction/catchAsync";
import sendResponse from "../../utlisFunction/sendResponse";
import { bannerService } from "./bannerService";

const createBanner = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No files were uploaded.",
    });
  }

  const result = await bannerService.createBannerIntoDB(req.file);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Banner created successfully",
    data: result,
  });
});

const getAllBanner = catchAsync(async (req, res) => {
  const result = await bannerService.getAllBannerFromDB();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "All Banner fetch successfully",
    data: result,
  });
});
const deleteBanner = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bannerService.deleteBannerFromDB(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Banner delete successfully",
    data: result,
  });
});

export const bannerController = {
  createBanner,
  getAllBanner,
  deleteBanner,
};
