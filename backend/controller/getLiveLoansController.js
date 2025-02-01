import mongoose from 'mongoose';

// already he imported , tho usko hi import kiya db m
const loanDataSchema = new mongoose.Schema({
    loan_amnt: Number,
    funded_amnt: Number,
    term: String,
    int_rate: Number,
    installment: Number,
    grade: String,
    sub_grade: String,
    emp_title: String,
    emp_length: String,
    home_ownership: String,
    annual_inc: Number,
    verification_status: String,
    issue_d: String,
    loan_status: String,
    purpose: String,
    zip_code: String,
    addr_state: String,
    dti: Number,
    delinq_2yrs: Number,
    earliest_cr_line: String,
    inq_last_6mths: Number,
    mths_since_last_delinq: Number,
    open_acc: Number,
    pub_rec: Number,
    revol_bal: Number,
    total_acc: Number,
    initial_list_status: String,
    out_prncp: Number,
    total_pymnt: Number,
    total_rec_prncp: Number,
    total_rec_int: Number,
    total_rec_late_fee: Number,
    recoveries: Number,
    collection_recovery_fee: Number,
    last_pymnt_d: String,
    last_pymnt_amnt: Number,
    next_pymnt_d: String,
    application_type: String,
    acc_now_delinq: Number,
    tot_cur_bal: Number,
    total_bal_il: Number,
    total_rev_hi_lim: Number,
    inq_fi: Number,
    inq_last_12m: Number,
    bc_util: Number,
    delinq_amnt: Number,
    mort_acc: Number,
    mths_since_recent_inq: Number,
    num_actv_bc_tl: Number,
    num_actv_rev_tl: Number,
    num_bc_sats: Number,
    num_bc_tl: Number,
    num_sats: Number,
    num_tl_120dpd_2m: Number,
    num_tl_30dpd: Number,
    num_tl_90g_dpd_24m: Number,
    num_tl_op_past_12m: Number,
    pct_tl_nvr_dlq: Number,
    pub_rec_bankruptcies: Number,
    tax_liens: Number,
    tot_hi_cred_lim: Number,
    total_bal_ex_mort: Number,
    total_bc_limit: Number,
    total_il_high_credit_limit: Number,
    hardship_flag: String
}, {
    collection: 'userData',
    strict: false
});

//  userData collection
const LoanData = mongoose.model('LoanData', loanDataSchema);

const getLiveLoansController = async (req, res) => {
    try {
        // Extract query parameters  . (YAHA PAR AUR PARAM ADD KAR SKTA , ABHI PUSHING LIKE THIS ONLY);
        const { 
            page = 1, 
            limit = 10, 
            status, 
            grade, 
            sub_grade, 
            minAmount, 
            maxAmount, 
            minIntRate, 
            maxIntRate 
        } = req.query;

        let query = {};

        // Apply filters dynamically
        if (status) query.loan_status = status;
        if (grade) query.grade = grade;
        if (sub_grade) query.sub_grade = sub_grade;

        // Loan Amount Range
        if (minAmount || maxAmount) {
            query.loan_amnt = {};
            if (minAmount) query.loan_amnt.$gte = Number(minAmount);
            if (maxAmount) query.loan_amnt.$lte = Number(maxAmount);
        }

        // Interest Rate Range
        if (minIntRate || maxIntRate) {
            query.int_rate = {};
            if (minIntRate) query.int_rate.$gte = Number(minIntRate);
            if (maxIntRate) query.int_rate.$lte = Number(maxIntRate);
        }

        // console.log("MongoDB Query:", query);

        // Pagination logic
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Fetch matching loans from MongoDB
        const loans = await LoanData.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .lean();

        // Count total number of matching loans
        const totalLoans = await LoanData.countDocuments(query);

        if (!loans || loans.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No live loans found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Live loans fetched successfully",
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalLoans / parseInt(limit)),
            totalLoans,
            loansPerPage: loans.length,
            data: loans
        });

    } catch (error) {
        console.error("Error fetching live loans:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching live loans",
            error: error.message
        });
    }
};

export default getLiveLoansController;
