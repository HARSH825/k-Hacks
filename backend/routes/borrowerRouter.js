import { Router } from "express";
import dotenv from 'dotenv';
// import adminMiddleware from "../middlewares/admin";
dotenv.config();
const router = Router();
import BorrowersignupPhoneController from '../controller/borrowerSignupPhoneNumber.js';
import BorrowersignupEmailController from '../controller/borrowersignupEmailController.js';
import BorrowersignupPasswordController from "../controller/borrowerPasswordController.js";

router.post('/signup/phoneNumber', BorrowersignupPhoneController);
router.post('/signup/email', BorrowersignupEmailController);
router.post('/signup/password', BorrowersignupPasswordController);

export default router;