import { PhoneNumberSchema } from '../validation/PhoneNumberValidation.js';
import { sendOTPToPhoneNumber, verifyOTP } from '../services/otpService.js';
import Lender from '../models/LenderUserSchema.js';

// ✅ Send OTP Controller
export const LendersignupPhoneController = async (req, res) => {
    const { phoneNumber } = req.body;

    // Validate phone number
    const result = PhoneNumberSchema.safeParse({ phoneNumber });
    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: result.error.errors.map(e => e.message).join(", "),
        });
    }

    try {
        // Check if phone number is already registered
        const existingLender = await Lender.findOne({ phoneNumber });
        if (existingLender) {
            return res.status(409).json({
                success: false,
                message: "Lender with this phone number already exists"
            });
        }

        // Send OTP
        const otpResponse = await sendOTPToPhoneNumber(phoneNumber);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to phone number. Please verify to continue.",
            messageId: otpResponse.messageId
        });
    } catch (error) {
        console.error("Error during OTP sending:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send OTP. Please try again later."
        });
    }
};

// ✅ Verify OTP Controller
export const verifyLenderOTPController = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    try {
        // Verify OTP
        await verifyOTP(phoneNumber, otp);

        return res.status(200).json({
            success: true,
            message: "Phone number verified successfully"
        });
    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
