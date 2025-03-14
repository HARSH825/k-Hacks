import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://harshchhallani3:teamQuisk@cluster0.lkhvc.mongodb.net/kaggle";
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
export default connectDb; 