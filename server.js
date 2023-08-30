import express from "express";
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

// rest object
const app = express();

// middlewares 
app.use(express.json());  // to avoid parse issue
app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'server is running',
    })
})


const port = process.env.PORT || 8080;

//listen port
app.listen(port, () => {
    console.log(`Server is running on ${port} port and in ${process.env.DEV_MODE}`.bgGreen);
})