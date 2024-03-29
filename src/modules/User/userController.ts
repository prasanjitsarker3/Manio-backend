import catchAsync from "../../utlisFunction/catchAsync";
import sendResponse from "../../utlisFunction/sendResponse";
import { authService } from "./userService";

const register = catchAsync(async (req, res) => {
  const result = await authService.registerUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successful",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successful",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await authService.userForgetPassword(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reset link generated successfully!",
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await authService.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset successfully!",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await authService.getMe(token);
  res.send(result);
});

const roleToggle = catchAsync(async (req, res) => {
  const { email } = req.query;
  if (!email || typeof email !== "string") {
    return res
      .status(400)
      .json({ success: false, message: "Email is required." });
  }
  const result = await authService.roleChangeInDB(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Role changed successfully.",
    data: result,
  });
});

export const authControllers = {
  register,
  login,
  changePassword,
  forgetPassword,
  resetPassword,
  getMe,
  roleToggle,
};
