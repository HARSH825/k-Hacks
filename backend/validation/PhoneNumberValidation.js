// validation/phoneValidation.js
import { z } from 'zod';

export const PhoneNumberSchema = z.object({
    phoneNumber: z
        .string()
        .min(10, "Phone number must be 10 characters long")
        .max(10, "Phone number must be 10 characters long")
        .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format. Must be in E.164 format, e.g., +1234567890")
});
export default PhoneNumberSchema;