import mongoose from "mongoose";
import colors from 'colors';

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongodb connected : ${mongoose.connection.host}`.bgGreen);
    }catch(error){
        console.log(`Mongodb issue ${error}`.bgRed);
    }
}

export default connectDB;

