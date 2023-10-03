import express from "express";
import { middlw } from "../middlewares/authMiddleware.js";
import { changeAccountStatusController, getAllDoctorsController, getAllUsersController } from "../controllers/adminCtrl.js";

// router instance
const router = express.Router();

router.get('/getAllUsers', middlw, getAllUsersController);

router.get('/getAllDoctors', middlw, getAllDoctorsController)

// post account status
router.post('/changeAccountStatus', middlw, changeAccountStatusController);

export default router;
