import express from 'express';
import { getVendor, signIn } from '../controllers/vendor.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.get('/:id', auth, getVendor);
router.post('/signin', signIn);
router.get('/refresh', refresh)

export default router;
