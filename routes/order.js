import express from 'express';
import { getOrder, getOrders, addOrder, updateOrder, deleteOrder, getMonthlySalesByVendorController, getTotalSalesAndRevenueByProductController } from '../controllers/order.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', auth, getOrders);
router.get('/:id', auth, getOrder);
router.post('/', auth, addOrder);
router.patch('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);
router.get('/monthly-sales/:vendorName', auth, getMonthlySalesByVendorController);
router.get('/total-sales-revenue/:vendorName', auth, getTotalSalesAndRevenueByProductController);

export default router;
