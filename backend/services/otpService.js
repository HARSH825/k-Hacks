import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;


const otpStore = new Map(); // { phoneNumber: { otp, expiresAt } }

// Function to send OTP
export const sendOTPToPhoneNumber = async (phoneNumber) => {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    otpStore.set(phoneNumber, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // Expires in 5 min

    try {
        const message = await twilioClient.messages.create({
            body: `Your verification code is ${otp}`,
            from: TWILIO_PHONE_NUMBER,
            to: phoneNumber
        });

        return { messageId: message.sid };
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw new Error("Failed to send OTP. Please try again.");
    }
};

// Function to verify OTP
export const verifyOTP = async (phoneNumber, otp) => {
    const storedOtpData = otpStore.get(phoneNumber);
    
    if (!storedOtpData || storedOtpData.expiresAt < Date.now()) {
        throw new Error("OTP expired. Please request a new one.");
    }

    if (storedOtpData.otp !== parseInt(otp)) {
        throw new Error("Invalid OTP. Please try again.");
    }

    otpStore.delete(phoneNumber);
    return { success: true };
};
