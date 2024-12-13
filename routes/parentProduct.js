import express from 'express';
import { getParentProduct, getParentProducts, addParentProduct, updateParentProduct, deleteParentProduct } from '../controllers/parentProduct.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/', auth, getParentProducts);
router.get('/:id', auth, getParentProduct);
router.post('/', auth, addParentProduct);
router.patch('/:id', auth, updateParentProduct);
router.delete('/:id', auth, deleteParentProduct);

export default router;
