import { Router } from "express";
import dotenv from 'dotenv';
// import adminMiddleware from "../middlewares/admin";
dotenv.config();
const router = Router();
import LendersignupPhoneController from '../controller/lenderSignupPhoneController.js';
import LendersignupEmailController from '../controller/lenderEmailController.js';
import LendersignupPasswordController from '../controller/lenderPasswordController.js';
import getLiveLoansController from "../controller/getLiveLoansController.js";
import getBorrowerInfoController from "../controller/getBorrowerInfoController.js";
import getriskrankController from "../controller/getriskrankController.js";
import {getLenderMatches} from "../controller/getBorrowerMatchesController.js";
// Lender Routes
router.post('/signup/phoneNumber', LendersignupPhoneController);
router.post('/signup/email', LendersignupEmailController);
router.post('/signup/password', LendersignupPasswordController);
// router.post('/login',LenderloginController);
router.get('/liveloans', getLiveLoansController);  // add middleware remainig in this route to validate lender.
router.get('/liveloans/:_id',getBorrowerInfoController); 
router.get('/riskRanking',getriskrankController);
router.get('/matched/:lenderId',getLenderMatches);
// router.post('/verify-otp',otpService);
export default router;
