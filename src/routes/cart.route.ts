import express from 'express';
const router = express.Router();
import * as cartController from '../controllers/Cart.controller';

router.get('/delete/:id', cartController.deleteCartItem);
router.post('/update', cartController.updateListCartItem);
router.get('/list', cartController.getListItemCart);
router.post('/add/:id', cartController.postAddCart);

export default router;
