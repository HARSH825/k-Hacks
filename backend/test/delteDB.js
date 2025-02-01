import mongoose from 'mongoose';
import LoanData from "../models/borrowerSchema.js";

const connectDB = async () => {
    try {
        // Replace with your MongoDB connection string
        const mongoURI = "mongodb+srv://harshchhallani3:teamQuisk@cluster0.lkhvc.mongodb.net/kaggle";
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};

export const deleteLowGradeLoans = async () => {
    try {
        // Ensure database connection is established first
        await connectDB();

        // Define grades lower than D1
        const lowGrades = ['D1','D2', 'D3', 'D4', 'D5', 'E1', 'E2', 'E3', 'E4', 'E5', 
                          'F1', 'F2', 'F3', 'F4', 'F5', 'G1', 'G2', 'G3', 'G4', 'G5'];
        
        // First, get count of documents to be deleted
        const countToDelete = await LoanData.countDocuments({
            sub_grade: { $in: lowGrades }
        });

        console.log(`Found ${countToDelete} documents to delete`);

        // Perform the deletion
        const result = await LoanData.deleteMany({
            sub_grade: { $in: lowGrades }
        });

        if (result.deletedCount === 0) {
            console.log("No loans found with grades lower than D1");
        } else {
            console.log(`Deleted ${result.deletedCount} loans with grades lower than D1 at ${new Date().toISOString()}`);
            console.log('Affected grades:', lowGrades);
        }

        // Close the connection after operation is complete
        await mongoose.connection.close();
        console.log('Database connection closed');

    } catch (error) {
        console.error('Error in deleteLowGradeLoans:', error);
        // Ensure connection is closed even if there's an error
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log('Database connection closed after error');
        }
    }
};

// Execute the function
deleteLowGradeLoans();