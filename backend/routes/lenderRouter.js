import { Router } from "express";
import dotenv from 'dotenv';
// import adminMiddleware from "../middlewares/admin";
dotenv.config();
const router = Router();
import LendersignupPhoneController from '../controller/lenderSignupPhoneController.js';
import LendersignupEmailController from '../controller/lenderEmailController.js';
import LendersignupPasswordController from '../controller/lenderPasswordController.js';

// Lender Routes
router.post('/signup/phoneNumber', LendersignupPhoneController);
router.post('/signup/email', LendersignupEmailController);
router.post('/signup/password', LendersignupPasswordController);
// router.post('/login',LenderloginController);
export default router;
