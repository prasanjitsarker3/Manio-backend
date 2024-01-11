import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/User/userInterface";
import catchAsync from "../utlisFunction/catchAsync";
import { handleUnauthorized } from "../utlisFunction/UnauthorizedError";
import config from "../config";
import { User } from "../modules/User/userModel";
import AppError from "../Error/AppError";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      handleUnauthorized(res, {
        success: false,
        message: "Unauthorized Access",
        errorMessage: "No JWT provided in the request headers.",
        errorDetails: null,
        stack: null,
      });
      return;
    }

    if (!config.accessToken) {
      throw new Error("Access token configuration is missing");
    }
    const decoded = jwt.verify(
      token,
      config.accessToken as string
    ) as JwtPayload;
    const { _id, role, email, iat } = decoded;
    const user = await User.findById(_id).select("+password");

    if (!user) {
      throw new AppError(404, "User Not Found!");
    }
    if (
      user.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangeAt,
        iat as number
      )
    ) {
      handleUnauthorized(res, {
        success: false,
        message: "Unauthorized Access",
        errorMessage: "The provided JSON Web Token has expired",
        errorDetails: "Please log in again to get a new token.",
        stack: null,
      });
      return;
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      handleUnauthorized(res, {
        success: false,
        message: "Unauthorized Access",
        errorMessage:
          "You do not have the necessary permissions to access this resource.",
        errorDetails: null,
        stack: null,
      });
      return;
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
