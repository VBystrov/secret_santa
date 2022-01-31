import express from 'express';
import userRoute from './user/userRoute.js';
import pairsRoute from './pairs/pairsRoute.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/', pairsRoute);

export default router;
