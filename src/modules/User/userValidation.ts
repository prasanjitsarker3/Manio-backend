import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(5, "Password must be at least 5 characters long")
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])/i,
        "Password must contain at least one capital letter and one number"
      ),
    role: z.enum(["user", "admin"]),
  }),
});
export const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(5, "Password must be at least 5 characters long")
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])/i,
        "Password must contain at least one capital letter and one number"
      ),
  }),
});
export const changePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z
      .string()
      .min(5, "Password must be at least 5 characters long")
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])/i,
        "Password must contain at least one capital letter and one number"
      ),
    newPassword: z
      .string()
      .min(5, "Password must be at least 5 characters long")
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])/i,
        "Password must contain at least one capital letter and one number"
      ),
  }),
});

export const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required!" }).email(),
  }),
});
export const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required!" }).email(),
    newPassword: z
      .string()
      .min(5, "Password must be at least 5 characters long")
      .regex(
        /^(?=.*[A-Z])(?=.*[0-9])/i,
        "Password must contain at least one capital letter and one number"
      ),
  }),
});

export const userValidation = {
  createUserValidationSchema,
  loginUserValidationSchema,
  changePasswordValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
