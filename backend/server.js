import express  from "express";
import dotenv from "dotenv"
import { connect } from "mongoose";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from  './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 4300


// MiddleWare

app.use(express.json());  // Parse the JSON Data in the req.body
app.use(express.urlencoded({extended:true})); // To Parse form data in the req.body
app.use(cookieParser())

// Routes
app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)




app.listen(PORT,()=>{
    console.log(`Server Started At PORT ${PORT}`)
})