import express from 'express';
import {  authController, loginController, registerController } from '../controllers/userCtrl.js';
import { middlw } from '../middlewares/authMiddleware.js';


// router object
const router = express.Router();

router.post('/login', loginController);

router.post('/register', registerController);

router.post('/getUserData', middlw, authController)

export default router;