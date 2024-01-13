import { JwtPayload } from "jsonwebtoken";
import AppError from "../../Error/AppError";
import config from "../../config";
import { createToken } from "./userContansts";
import {
  IChangePassword,
  ILoginUser,
  TForgetUser,
  TUser,
} from "./userInterface";
import { User } from "./userModel";
import bcrypt from "bcrypt";
import { sendMailer } from "../../utlisFunction/sendMail";
import jwt from "jsonwebtoken";

const registerUser = async (payload: TUser) => {
  const result = await User.create(payload);
  const { password, passwordChangeAt, ...resultWithoutPassword } =
    result.toObject();
  return resultWithoutPassword;
};

const loginUser = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    "+password"
  );

  if (!user) {
    throw new AppError(404, "User Not Found!");
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(401, "Password does not match!");
  }

  const jwtPayload = {
    _id: user.id,
    role: user.role,
    email: user.email,
  };

  const token = createToken(
    jwtPayload,
    config.accessToken as string,
    config.accessTokenExpaierDate as string
  );
  return {
    user: {
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: IChangePassword
) => {
  const { currentPassword, newPassword } = payload;
  const user = await User.findById(userData._id).select("+password");
  if (!user) {
    throw new AppError(404, "User Not Found !");
  }
  if (payload.newPassword === payload.currentPassword) {
    throw new AppError(
      404,
      "New password should be different from the current password."
    );
  }
  if (
    !(await User.isPasswordMatched(payload?.currentPassword, user?.password))
  ) {
    throw new AppError(404, "Old Password doesn't match");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcryptSalt)
  );

  await User.findOneAndUpdate(
    { id: userData.userId, role: userData.role },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );
  return null;
};

const userForgetPassword = async (payload: TForgetUser) => {
  const user = await User.findOne({ email: payload?.email });
  if (!user) {
    throw new AppError(404, "User Not Found!");
  }
  const jwtPayload = {
    _id: user.id,
    role: user.role,
    email: user.email,
  };

  const token = createToken(jwtPayload, config.accessToken as string, "20m");

  const resetUILink = `${config.resetPasswordUI}?email=${user.email}&token=${token}`;
  sendMailer(user?.email, resetUILink);
  //   console.log(resetUILink);
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: any
) => {
  const user = await User.findOne({ email: payload?.email });
  if (!user) {
    throw new AppError(404, "User Not Found!");
  }

  const decoded = jwt.verify(token, config.accessToken as string) as JwtPayload;
  const { _id, email, role } = decoded;
  if (decoded.email !== payload?.email) {
    throw new AppError(404, "Invalid Email !");
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcryptSalt)
  );

  await User.findOneAndUpdate(
    { _id: _id, role: role },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );
  return null;
};

const getMe = async (token: any) => {
  const decoded = jwt.verify(token, config.accessToken as string) as JwtPayload;
  const { email, role } = decoded;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(404, "User Not Found!");
  }
  return { email: user.email, role: user.role };
};

const roleChangeInDB = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found.");
  }
  user.role = user.role === "user" ? "admin" : "user";
  await user.save();
  return user;
};

export const authService = {
  registerUser,
  loginUser,
  changePassword,
  userForgetPassword,
  resetPassword,
  getMe,
  roleChangeInDB,
};
