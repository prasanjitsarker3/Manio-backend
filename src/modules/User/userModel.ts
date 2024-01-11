import { TUser, UserModel } from "./userInterface";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required !"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    passwordChangeAt: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
    phone: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcryptSalt));
  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>("User", userSchema);
