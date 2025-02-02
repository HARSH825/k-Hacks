import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

// Import Controllers
import {LendersignupPhoneController , verifyLenderOTPController } from "../controller/lenderSignupPhoneController.js";
import LendersignupEmailController from "../controller/lenderEmailController.js";
import LendersignupPasswordController from "../controller/lenderPasswordController.js";
import getLiveLoansController from "../controller/getLiveLoansController.js";
import getBorrowerInfoController from "../controller/getBorrowerInfoController.js";
import getriskrankController from "../controller/getriskrankController.js";
import { getLenderMatches} from "../controller/getBorrowerMatchesController.js";

// Lender Signup Routes
router.post("/signup/phoneNumber", LendersignupPhoneController);
router.post("/signup/email", LendersignupEmailController);
router.post("/signup/password", LendersignupPasswordController);

// Loan & Borrower Routes
router.get("/liveloans", getLiveLoansController); 
router.get("/liveloans/:_id", getBorrowerInfoController);
router.get("/riskRanking", getriskrankController);
router.get("/matched/:lenderId", getLenderMatches);

//  OTP Verification Route
router.post("/verify-otp", verifyLenderOTPController);

export default router;
