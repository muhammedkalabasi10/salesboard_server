import express from 'express';
import { getOrder, getOrders, addOrder, updateOrder, deleteOrder } from '../controllers/order.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', auth, getOrders);
router.get('/:id', auth, getOrder);
router.post('/', auth, addOrder);
router.patch('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);

export default router;
