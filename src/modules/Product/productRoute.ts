import express, { NextFunction, Request, Response } from "express";
import { productController } from "./productController";
import { upload } from "../../utlisFunction/sendImageToCouldinary";

const router = express.Router();
router.post(
  "/create-product",
  upload.array("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  productController.createProduct
);
router.get("/", productController.getAllProduct);
router.get("/:id", productController.getSingleProduct);
router.delete("/:id", productController.deletedProduct);

export const productRoutes = router;
