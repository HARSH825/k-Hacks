import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },  // Auto-generate ID
    
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed
    phoneNumber: { type: String, required: true },
    
    emp_title: { type: String, default: "Unemployed" },  // Default to 'Unemployed' 
    emp_length: { 
        type: String, 
        enum: ["<1 year", "1 year", "2 years", "3 years", "4 years", "5 years", "6 years", "7 years", "8 years", "9 years", "10+ years"], 
        default: "<1 year" 
    },

    home_ownership: { type: String, enum: ["OWN", "MORTGAGE", "RENT", "OTHER"], default: "RENT" },
    annual_inc: { type: Number, default: 25000 }, // Assuming a base salary of $25k if not provided
    verification_status: { type: String, enum: ["Verified", "Not Verified"], default: "Not Verified" },

    zip_code: { type: String, default: "00000" },  // Default ZIP to "00000" if not available
    addr_state: { type: String, default: "Unknown" },  // Default to "Unknown"

    credit_history: {
        dti: { type: Number, default: 15 },  // Default DTI ratio of 15%
        delinq_2yrs: { type: Number, default: 0 }, // Default: No delinquency in past 2 years
        earliest_cr_line: { type: String, default: "Jan-2024" }, // Assume first credit opened in 2000
        inq_last_6mths: { type: Number, default: 0 }, // Default: No recent inquiries
        open_acc: { type: Number, default: 3 }, // Default: 3 open accounts
        pub_rec: { type: Number, default: 0 },  // Default: No public records
        revol_bal: { type: Number, default: 5000 },  // Default revolving balance of $5000
        total_acc: { type: Number, default: 5 },  // Default: 5 total accounts
        total_rev_hi_lim: { type: Number, default: 15000 },  // Default high credit limit: $15,000
        pub_rec_bankruptcies: { type: Number, default: 0 }, // Default: No bankruptcies
        tax_liens: { type: Number, default: 0 },  // Default: No tax liens
    },

    financial_profile: {
        tot_cur_bal: { type: Number, default: 10000 },  // Default total balance: 10,000
        total_bal_ex_mort: { type: Number, default: 8000 },  // Default: Excluding mortgage
        total_bc_limit: { type: Number, default: 12000 },  // Default: Credit card limit 12,000
        total_il_high_credit_limit: { type: Number, default: 5000 },  // Default: Installment credit limit
    },

    hardship_flag: { type: String, enum: ["Y", "N"], default: "N" },  // Default: No financial hardship

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// // Auto-update the updatedAt field on document save
// UserSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

const Lender = mongoose.model('Lender', UserSchema);
export default Lender ; 
