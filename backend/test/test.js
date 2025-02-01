// import dotenv from 'dotenv';
// dotenv.config();  // Load .env first
// import mongoose from 'mongoose';


// const MONGO_URI = "mongodb+srv://harshchhallani3:teamQuisk@cluster0.lkhvc.mongodb.net/kaggle";

// if (!MONGO_URI) {
//     console.error("Error: MONGO_URI is undefined. Check your .env file.");
//     process.exit(1);
// }

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, {
// })
// .then(async () => {
//     console.log("MongoDB connected successfully!");

//     // Get the database connection
//     const db = mongoose.connection.db;

//     // Count the number of documents in the `userData` collection
//     const count = await db.collection('userData').countDocuments();
//     console.log('Documents found:', count);

//     process.exit(0);  // Exit script after fetching data
// })
// .catch(err => {
//     console.error("Error connecting to MongoDB:", err);
   
// });
