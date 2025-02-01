// validation/emailValidation.js
import { z } from 'zod';

export const EmailSchema = z.object({
    email: z
        .string()
        .email("Invalid email format")
        .min(5, "Email must be at least 5 characters long")
        .max(50, "Email cannot exceed 50 characters")
});
export default EmailSchema;