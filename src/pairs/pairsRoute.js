import express from 'express';
// import asyncHandler from '../helpers/asyncHandler.js';
import pairsController from './pairsController.js';

const router = express.Router();

router.post('/shuffle', pairsController.shuffle.bind(pairsController));
router.get(
  '/pairs/:senderid',
  pairsController.getRecipient.bind(pairsController)
);

export default router;
