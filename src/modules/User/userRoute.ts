import express from "express";
import validateRequest from "../../Middlewares/validationRequest";
import { userValidation } from "./userValidation";
import { authControllers } from "./userController";
import auth from "../../Middlewares/auth";
import { USER_ROLE } from "./userContansts";

const router = express.Router();
router.post(
  "/register",
  validateRequest(userValidation.createUserValidationSchema),
  authControllers.register
);
router.post(
  "/login",
  validateRequest(userValidation.loginUserValidationSchema),
  authControllers.login
);

router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(userValidation.changePasswordValidationSchema),
  authControllers.changePassword
);

router.post(
  "/forget-password",
  validateRequest(userValidation.forgetPasswordValidationSchema),
  authControllers.forgetPassword
);
router.post(
  "/reset-password",
  validateRequest(userValidation.forgetPasswordValidationSchema),
  authControllers.resetPassword
);

router.get("/me", auth(USER_ROLE.admin, USER_ROLE.user), authControllers.getMe);
router.post("/role", authControllers.roleToggle);
export const userRoutes = router;
