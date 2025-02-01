import LoanData from "../models/borrowerSchema.js";

const getBorrowerInfoController = async (req, res) => {
    try {
        const { _id } = req.params;  // Extract _id from route parameter

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Borrower ID (_id) is required"
            });
        }

        const borrower = await LoanData.findById(_id).lean();

        if (!borrower) {
            return res.status(404).json({
                success: false,
                message: "Borrower not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Borrower info retrieved successfully",
            data: borrower
        });

    } catch (error) {
        console.error("Error fetching borrower info:", error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving borrower information"
        });
    }
};

export default getBorrowerInfoController;
