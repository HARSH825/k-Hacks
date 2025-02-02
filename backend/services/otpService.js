const otpStore = new Map(); // Stores OTPs temporarily { phoneNumber: { otp, expiresAt } }

// ✅ Function to send OTP (Generates & stores OTP)
export const sendOTPToPhoneNumber = async (phoneNumber) => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    otpStore.set(phoneNumber, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // Expires in 5 min

    console.log(`OTP for ${phoneNumber}: ${otp}`); // Log OTP for testing

    return { success: true, messageId: `test-${Date.now()}` };
};

// ✅ Function to verify OTP
export const verifyOTP = async (phoneNumber, otp) => {
    const storedOtpData = otpStore.get(phoneNumber);

    if (!storedOtpData) {
        throw new Error("No OTP found for this phone number. Please request a new one.");
    }

    if (storedOtpData.expiresAt < Date.now()) {
        otpStore.delete(phoneNumber); // Delete expired OTP
        throw new Error("OTP expired. Please request a new one.");
    }

    if (storedOtpData.otp !== parseInt(otp)) {
        throw new Error("Invalid OTP. Please try again.");
    }

    otpStore.delete(phoneNumber); // Remove OTP after successful verification
    return { success: true, message: "OTP verified successfully" };
};
