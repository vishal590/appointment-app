import express from "express";
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import authRoute from './routes/userRoutes.js'
import adminRoute from './routes/adminRoutes.js'
import doctorRoute from './routes/doctorRoutes.js'

dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middlewares 
app.use(express.json());  // to avoid parse issue
app.use(morgan('dev'));

// routes
app.use('/api/v1/user', authRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/doctor', doctorRoute);


const port = process.env.PORT || 8080;

//listen port
app.listen(port, () => {
    console.log(`Server is running on ${port} port and in ${process.env.DEV_MODE}`.bgGreen);
})