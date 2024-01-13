import { Router } from "express";
import { productRoutes } from "../modules/Product/productRoute";
import { userRoutes } from "../modules/User/userRoute";
import { bannerRoutes } from "../modules/BannerPhoto/bannerRoute";
import { orderRoutes } from "../modules/OrderProduct/orderProductRoute";

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
  {
    path: "/banner",
    route: bannerRoutes,
  },
  {
    path: "/order",
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
