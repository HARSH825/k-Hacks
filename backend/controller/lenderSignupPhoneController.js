import { PhoneNumberSchema } from '../validation/PhoneNumberValidation.js';
// import { sendOTPToPhoneNumber } from '../services/otpService.js';  // Assuming an OTP service
import Lender from '../models/LenderUserSchema.js';  // Import Lender model

const LendersignupPhoneController = async (req, res) => {
    const {phoneNumber} = req.body;
    // Validate phone number
    const result = PhoneNumberSchema.safeParse({ phoneNumber });
    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: result.error.errors.map(e => e.message).join(", "),
        });
    }

    try {
        // Check if the phone number is already in use (No need to create the lender yet)
        const existingLender = await Lender.findOne({ phoneNumber });
        if (existingLender) {
            return res.status(409).json({
                success: false,
                message: "Lender with this phone number already exists"
            });
        }

        // Send OTP to the phone number (for validation)
        // const otp = await sendOTPToPhoneNumber(phoneNumber);  // Simulated OTP sending
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to phone number. Please verify to continue.",
            // otp  // Note: In a real app, you should never send OTP in the response
        });
    } catch (error) {
        console.log("Error during phone number verification:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong on our side.",
        });
    }
};

export default LendersignupPhoneController;
