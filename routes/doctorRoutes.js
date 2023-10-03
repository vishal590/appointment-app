import express from "express";
import { middlw } from "../middlewares/authMiddleware.js";
import { getDoctorInfoController, updateProfileController } from "../controllers/doctorCtrl.js";



const router = express.Router();

router.post('/getDoctorInfo', middlw, getDoctorInfoController);

router.post('/updateProfile',middlw, updateProfileController);

export default router;