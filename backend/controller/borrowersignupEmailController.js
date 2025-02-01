import { EmailSchema } from '../validation/EmailValidation.js';
// import { sendOTPToEmail } from '../services/otpService.js';  // OTP service
import Borrower from '../models/borrowerSchema.js'; 

const BorrowersignupEmailController = async (req, res) => {
    const { email } = req.body;

    // Validate email
    const result = EmailSchema.safeParse({ email });
    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: result.error.errors.map(e => e.message).join(", "),
        });
    }

    try {
        // Check if the email is already
        const existingBorrower = await Borrower.findOne({ email });
        if (existingBorrower) {
            return res.status(409).json({
                success: false,
                message: "Borrower with this email already exists"
            });
        }

        // Send OTP to the email (for validation)
        // const otp = await sendOTPToEmail(email);  // Simulated OTP sending
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to email. Please verify to continue.",
            // otp  
        });

    } catch (error) {
        console.error("Error during email verification:", error);  

        return res.status(500).json({
            success: false,
            message: "Something went wrong on our side.",
        });
    }
};

export default BorrowersignupEmailController;
