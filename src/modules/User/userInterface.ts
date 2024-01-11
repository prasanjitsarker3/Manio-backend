import { Model } from "mongoose";
import { USER_ROLE } from "./userContansts";

export type TUser = {
  name?: string;
  email: string;
  password: string;
  role: "user" | "admin";
  phone?: number;
  passwordChangeAt?: Date;
};

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface TForgetUser {
  email: string;
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
