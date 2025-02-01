// validation/passwordValidation.js
import { z } from 'zod';

export const PasswordSchema = z.object({
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        // .regex(/[a-zA-Z]/, "Password must contain at least one letter")
        // .regex(/[0-9]/, "Password must contain at least one number")
        // .regex(/[\W_]/, "Password must contain at least one special character (e.g., @, #, $, etc.)")
});

export default PasswordSchema;