import bcrypt from 'bcrypt';
import { PasswordSchema } from '../validation/PasswordValidation.js';
import Borrower from '../models/borrowerSchema.js';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10;

const BorrowersignupPasswordController = async (req, res) => {
    const { phoneNumber, email, password } = req.body;

    console.log(phoneNumber);
    console.log(email);
    console.log(password);

    // Ensure phoneNumber, email, and password are provided
    if (!phoneNumber || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Phone number, email, and password are required."
        });
    }

    // Validate password using schema
    const result = PasswordSchema.safeParse({ password });
    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: result.error.errors.map(e => e.message).join(", "),
        });
    }

    try {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create the borrower with phoneNumber, email, password
        const newBorrower = await Borrower.create({
            phoneNumber,
            email,
            password: hashedPassword,
            createdAt: new Date(),

            
            loan_amnt: 5000,
            funded_amnt: 5000,
            term: "36 months",
            int_rate: 10.99,
            installment: 150.00,
            grade: "B",
            sub_grade: "B2",
            emp_title: "Unknown",
            emp_length: "5 years",
            home_ownership: "RENT",
            annual_inc: 40000,
            verification_status: "Not Verified",
            issue_d: "Jan-2024",
            loan_status: "Current",
            purpose: "debt_consolidation",
            zip_code: "000xx",
            addr_state: "NY",
            dti: 15.0,
            delinq_2yrs: 0,
            earliest_cr_line: "Jan-2010",
            inq_last_6mths: 1,
            open_acc: 5,
            pub_rec: 0,
            revol_bal: 1000,
            total_acc: 10,
            initial_list_status: "w",
            out_prncp: 0,
            total_pymnt: 0,
            total_rec_prncp: 0,
            total_rec_int: 0,
            total_rec_late_fee: 0,
            recoveries: 0,
            collection_recovery_fee: 0,
            last_pymnt_d: "Jan-2024",
            last_pymnt_amnt: 0,
            next_pymnt_d: "Feb-2024",
            application_type: "Individual",
            acc_now_delinq: 0,
            tot_cur_bal: 10000,
            total_bal_il: 0,
            total_rev_hi_lim: 5000,
            inq_fi: 0,
            inq_last_12m: 0,
            bc_util: 50.0,
            delinq_amnt: 0,
            mort_acc: 1,
            num_actv_bc_tl: 2,
            num_actv_rev_tl: 3,
            num_bc_sats: 2,
            num_bc_tl: 2,
            num_sats: 5,
            num_tl_120dpd_2m: 0,
            num_tl_30dpd: 0,
            num_tl_90g_dpd_24m: 0,
            num_tl_op_past_12m: 1,
            pct_tl_nvr_dlq: 100,
            pub_rec_bankruptcies: 0,
            tax_liens: 0,
            tot_hi_cred_lim: 20000,
            total_bal_ex_mort: 1000,
            total_bc_limit: 2000,
            total_il_high_credit_limit: 5000,
            hardship_flag: "N"
        });

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "Borrower account created successfully",
            borrowerId: newBorrower._id  // Optional
        });

    } catch (error) {
        console.error("Error creating borrower account:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating borrower account",
        });
    }
};

export default BorrowersignupPasswordController;
