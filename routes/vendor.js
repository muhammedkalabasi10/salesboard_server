import express from 'express';
import { signIn, refresh, logout } from '../controllers/vendor.js';

const router = express.Router();

router.post('/signin', signIn);
router.get('/refresh', refresh);
router.post('/logout', logout);

export default router;
