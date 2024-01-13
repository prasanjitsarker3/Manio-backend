import express, { NextFunction, Request, Response } from "express";
import { bannerController } from "./bannerController";
import { upload } from "../../utlisFunction/sendImageToCouldinary";
const router = express.Router();

router.post(
  "/create",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = req.file;
    next();
  },
  bannerController.createBanner
);
router.get("/", bannerController.getAllBanner);
router.delete("/:id", bannerController.deleteBanner);
export const bannerRoutes = router;
