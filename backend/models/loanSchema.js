import mongoose from 'mongoose';

const LoanSchema = new mongoose.Schema({
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Refers to the Borrower (User Model)
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 100,  // Minimum loan amount
    },
    interestRate: {
        type: Number,
        required: true,
        min: 9,  // 
    },
    durationMonths: {
        type: Number,
        required: true,
        min: 1,  // Minimum duration (e.g., 1 month)
    },
    loanType: {
        type: String,
        enum: ['Personal', 'Business', 'Education', 'Medical', 'Home Renovation'],
        required: true
    },
    loanPurpose: {
        type: String,
        required: true
    },
    loanStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Funded', 'Rejected', 'Active', 'Completed', 'Defaulted'],
        default: 'Pending'
    },
    alternativeCreditScore: {
        creditScore: { type: Number, default: 0 },  // AI-based Credit Score
        riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
    },
    repaymentSchedule: [
        {
            dueDate: { type: Date },
            amountDue: { type: Number },
            status: { type: String, enum: ['Pending', 'Paid', 'Late'], default: 'Pending' },
            paidDate: { type: Date, default: null }
        }
    ],
    fundingStatus: {
        fundedAmount: { type: Number, default: 0 },
        fullyFunded: { type: Boolean, default: false },
        contributors: [
            {
                lender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Lender reference
                amountContributed: { type: Number, default: 0 }
            }
        ]
    },
    latePaymentPenalty: {
        type: Number,
        default: 50  // Flat penalty fee
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    approvalDate: {
        type: Date
    },
    disbursementDate: {
        type: Date
    }
}, { timestamps: true });

const Loan = mongoose.model('Loan', LoanSchema);
module.exports = Loan;
