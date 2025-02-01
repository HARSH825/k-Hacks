import LoanData from "../models/borrowerSchema.js";

const getSortedLoansController = async (req, res) => {
    try {
        
        const { 
            page = 1, 
            limit = 10, 
            sortOrder = 'asc'  // Default sort order is ascending
        } = req.query;

        // Sorting logic
        const sort = { sub_grade: sortOrder === 'asc' ? 1 : -1 };  // Ascending or descending based on query

        // Pagination logic
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Fetch sorted loans from MongoDB
        const loans = await LoanData.find()
            .skip(skip)
            .limit(parseInt(limit))
            .sort(sort)  // Apply sorting here
            .lean();

        // Count total number of loans
        const totalLoans = await LoanData.countDocuments();

        if (!loans || loans.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No loans found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Loans fetched successfully",
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalLoans / parseInt(limit)),
            totalLoans,
            loansPerPage: loans.length,
            data: loans
        });

    } catch (error) {
        console.error("Error fetching loans:", error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching loans",
            error: error.message
        });
    }
};

export default getSortedLoansController;

