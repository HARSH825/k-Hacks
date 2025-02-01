//Hungarian Algorithm for loan matching algorithm . 

import mongoose from 'mongoose';
import Borrower from '../models/borrowerSchema.js';
import Lender from '../models/LenderUserSchema.js';

// Calculate match score between a lender and a borrower
const calculateMatchScore = (lender, borrower) => {
    // Initialize weights for different matching criteria
    const weights = {
        creditScore: 0.4,
        loanAmount: 0.3,
        interestRate: 0.3
    };

    try {
        
        const lenderPreferredScore = lender.preferred_credit_score || 700;
        const lenderMinLoanAmount = lender.min_loan_amount || 1000;
        const lenderMaxLoanAmount = lender.max_loan_amount || 50000;
        const lenderMinInterestRate = lender.min_interest_rate || 5;
        const lenderMaxInterestRate = lender.max_interest_rate || 20;

        // Borrower 
        const borrowerCreditScore = borrower.credit_score ?? 650;
        const borrowerLoanAmount = borrower.loan_amnt ?? 5000;
        const borrowerInterestRate = borrower.int_rate ?? 10;

        // Credit Score Match (normalize to 0-1)
        const creditScoreMatch = Math.max(0, 1 - Math.abs(borrowerCreditScore - lenderPreferredScore) / 300);

        // Loan Amount Match (check if within range)
        const loanAmountMatch = (borrowerLoanAmount >= lenderMinLoanAmount && 
                                borrowerLoanAmount <= lenderMaxLoanAmount) ? 1 : 0;

        // Interest Rate Match
        const interestRateMatch = (borrowerInterestRate >= lenderMinInterestRate && 
                                  borrowerInterestRate <= lenderMaxInterestRate) ? 1 : 0;

        // Calculate weighted score
        const totalScore = (creditScoreMatch * weights.creditScore) +
                          (loanAmountMatch * weights.loanAmount) +
                          (interestRateMatch * weights.interestRate);

        return Number.isNaN(totalScore) ? 0 : totalScore;
    } catch (error) {
        console.error('Error calculating match score:', error);
        return 0;
    }
};

// Main matching fun
export const findMatchesForLender = async (lenderId) => {
    // Add timeout 
    const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Query timed out')), 10000)
    );

    try {
        // lender with timeout
        let lender = await Promise.race([
            Lender.findById(lenderId),
            timeout
        ]);

        if (!lender) {
            console.warn(`Lender not provided input fields, using default values for best borrower matching`);
            lender = {
                preferred_credit_score: 700,
                min_loan_amount: 1000,
                max_loan_amount: 50000,
                min_interest_rate: 5,
                max_interest_rate: 20
            };
        }

        // 2. Find all active borrowers with timeout
        let borrowers = await Promise.race([
            Borrower.find({ loan_status: 'Current' }).limit(100),  // Limit processing to 100 borrowers
            timeout
        ]);

        if (!borrowers || borrowers.length === 0) {
            return {
                success: true,
                lenderId: lenderId,
                totalMatches: 0,
                matches: []
            };
        }

        //mapping borrrower
        borrowers = borrowers.map(borrower => ({
            _id: borrower._id,
            credit_score: borrower.credit_score ?? 650,
            loan_amnt: borrower.loan_amnt ?? 5000,
            int_rate: borrower.int_rate ?? 10
        }));

        // Calculate match scores
        const matchScores = borrowers.map(borrower => {
            const score = calculateMatchScore(lender, borrower);
            return {
                borrowerId: borrower._id,
                score,
                borrowerDetails: {
                    credit_score: borrower.credit_score,
                    loan_amount: borrower.loan_amnt,
                    interest_rate: borrower.int_rate
                }
            };
        });

        // Filtering and sort matches
        const qualifiedMatches = matchScores
            .filter(match => match.score >= 0.6 && !Number.isNaN(match.score))
            .sort((a, b) => b.score - a.score)
            .slice(0, 20);  // Limit results

        //resp
        return {
            success: true,
            lenderId: lenderId,
            totalMatches: qualifiedMatches.length,
            matches: qualifiedMatches.map(match => ({
                borrowerId: match.borrowerId,
                matchScore: Math.round(match.score * 100) / 100,
                matchQuality: match.score >= 0.8 ? "Excellent" :
                            match.score >= 0.7 ? "Very Good" :
                            match.score >= 0.6 ? "Good" : "Fair",
                borrowerDetails: match.borrowerDetails
            }))
        };

    } catch (error) {
        throw new Error(`Matching error: ${error.message}`);
    }
};

// API
export const getLenderMatches = async (req, res) => {
    try {
        const { lenderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(lenderId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid lender ID format'
            });
        }

        // overall timeout for the entire operation
        const result = await Promise.race([
            findMatchesForLender(lenderId),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timed out')), 15000)
            )
        ]);

        res.status(200).json(result);

    } catch (error) {
        console.error('Error in getLenderMatches:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error finding matches',
            error: error.toString()
        });
    }
};
