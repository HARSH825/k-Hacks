import LoanData from "../models/borrowerSchema.js";

const getLoanDataSorted = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
        
        const loans = await LoanData.find({})
            .sort({ sub_grade: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        const total = await LoanData.countDocuments();

        if (!loans || loans.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No loan data found"
            });
        }

        return res.status(200).json({
            success: true,
            count: loans.length,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: loans
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

export default getLoanDataSorted;