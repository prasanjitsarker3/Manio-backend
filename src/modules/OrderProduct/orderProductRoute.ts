import express from "express";
import { orderController } from "./orderProductController";
const router = express.Router();

router.post("/create", orderController.createOrderUser);
router.get("/allOrder", orderController.getAllOrder);
router.get("/", orderController.singleUserOrder);
router.delete("/:id", orderController.deleteUserOrder);
router.post("/:id", orderController.statusToggle);

export const orderRoutes = router;
