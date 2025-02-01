import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv'
dotenv.config();

const app = express(); 
 app.use(cors()); 
 app.use(express.json());  
//  connectDb();  
 
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Server connected to : "+PORT);
})