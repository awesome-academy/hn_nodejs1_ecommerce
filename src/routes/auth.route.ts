import express from 'express';
const router = express.Router();
import * as authController from '../controllers/Auth.controller';

router.get('/logout', authController.logout)
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

export default router;
