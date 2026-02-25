import { Router } from "express";
import * as orderController from "../controllers/order.controller";

const router = Router();

router.post("/orders", orderController.postOrders);
router.post("/array-practice", orderController.postArrayPractice);

export default router;
