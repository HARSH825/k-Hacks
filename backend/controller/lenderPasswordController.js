import bcrypt from 'bcrypt';
import { PasswordSchema } from '../validation/PasswordValidation.js';  // Assuming Password validation is handled
import Lender from '../models/LenderUserSchema.js';  // Lender model 
import dotenv from 'dotenv'; 

dotenv.config(); 

const SALT_ROUNDS =10;

const LendersignupPasswordController = async (req, res) => {
    const { phoneNumber, email, password } = req.body;
    console.log(phoneNumber);
    console.log(email);
    console.log(password);
    // Ensure phoneNumber and email are provided
    if (!phoneNumber || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Phone number, email, and password are required."
        });
    }

    const result = PasswordSchema.safeParse({ password });
    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: result.error.errors.map(e => e.message).join(", "),
        });
    }

    try {
        
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create the lender with phoneNumber, email, and hashed password
        const newLender = await Lender.create({
            phoneNumber,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "Lender account created successfully",
            lenderId: newLender._id  // Optional
        });

    } catch (error) {
        console.error("Error creating lender account:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating lender account",
        });
    }
};

export default LendersignupPasswordController;
