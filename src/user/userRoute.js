import express from 'express';
import userController from './userController.js';

const router = express.Router();

router.post('/', userController.register.bind(userController));

export default router;
