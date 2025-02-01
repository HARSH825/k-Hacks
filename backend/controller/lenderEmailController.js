import { EmailSchema } from '../validation/EmailValidation.js';
// import { sendOTPToEmail } from '../services/otpService.js';  // Assuming an OTP service
import Lender from '../models/LenderUserSchema.js';  // Import Lender model

const LendersignupEmailController = async (req, res) => {
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
        // Check if the email is already in use (No need to create the lender yet)
        const existingLender = await Lender.findOne({ email });
        if (existingLender) {
            return res.status(409).json({
                success: false,
                message: "Lender with this email already exists"
            });
        }

        // Send OTP to the email (for validation)
        // const otp = await sendOTPToEmail(email);  // Simulated OTP sending
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to email. Please verify to continue.",
            // otp  // Again, don't return OTP in the response in production!
        });
    } catch (error) {
        console.log("Error during email verification:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong on our side.",
        });
    }
};

export default LendersignupEmailController;
