import express from 'express';
import {  applyDoctorController, authController, getAllNotificationController, loginController, registerController } from '../controllers/userCtrl.js';
import { middlw } from '../middlewares/authMiddleware.js';


// router object
const router = express.Router();

router.post('/login', loginController);

router.post('/register', registerController);

router.post('/getUserData', middlw, authController)

router.post('/apply-doctor', middlw, applyDoctorController);

router.post('/get-all-notification', middlw, getAllNotificationController);

export default router;