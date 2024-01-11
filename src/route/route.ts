import { Router } from "express";
import { productRoutes } from "../modules/Product/productRoute";
import { userRoutes } from "../modules/User/userRoute";

const router = Router();

const moduleRoutes = [
  {
    path: "/product",
    route: productRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
