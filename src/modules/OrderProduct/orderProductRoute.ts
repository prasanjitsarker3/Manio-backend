import express from "express";
import { orderController } from "./orderProductController";
const router = express.Router();

router.post("/create", orderController.createOrderUser);
router.get("/allOrder", orderController.getAllOrder);
router.get("/", orderController.singleUserOrder);

export const orderRoutes = router;
