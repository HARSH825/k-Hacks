import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv'
import connectDb from './db.js/connectDb.js';
dotenv.config();
const app = express(); 
app.use(express.json());
import lenderRouter from './routes/lenderRouter.js';
app.use('/lend',lenderRouter);
// app.use('/borrow',borrowerRouter);
 app.use(cors()); 
 
 connectDb();  
 
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Server connected to : "+PORT);
})