import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post('/',userControllers.createUser);
router.get('/',userControllers.getAllUser);
router.get('/:userId',userControllers.getUserById);
router.put('/:userId',userControllers.updateUserById);
router.delete('/:userId',userControllers.deleteUserById);
router.put('/:userId/orders',userControllers.updateOrderInUser);
router.get('/:userId/orders',userControllers.allOrderInUser);
router.get('/:userId/orders/total-price',userControllers.ordersPriceInUser);

export const userRoutes = router

