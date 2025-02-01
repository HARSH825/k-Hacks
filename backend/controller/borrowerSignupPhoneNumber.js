import { PhoneNumberSchema } from '../validation/PhoneNumberValidation.js';
// import { sendOTPToPhoneNumber } from '../services/otpService.js';  // Assuming an OTP service
import BorrowerSchema from '../models/borrowerSchema.js';  

const BorrowersignupPhoneController = async (req, res) => {
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
        // Check if the phone number is already in use
        const existingBorrower = await BorrowerSchema.findOne({ phoneNumber });
        if (existingBorrower) {
            return res.status(409).json({
                success: false,
                message: "Borrower with this phone number already exists"  
            });
        }

        // Send OTP to the phone number (for validation)
        // const otp = await sendOTPToPhoneNumber(phoneNumber);  // Simulated OTP sending

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to phone number. Please verify to continue.",
            // otp  // 
        });

    } catch (error) {
        console.error("Error during phone number verification:", error); 

        return res.status(500).json({
            success: false,
            message: "Something went wrong on our side.",
        });
    }
};

export default BorrowersignupPhoneController;
