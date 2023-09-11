import userModel from "../models/userModels.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//  register callback
export const registerController  = async (req, res) => {
    try{
        const existinguser = await userModel.findOne({email: req.body.email});
        if(existinguser){
            return res.status(200).send({message: 'user already exist', success: false,})
        }
        
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({
            success: true,
            message: `Registeration successful`.bgGreen,
            newUser,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Internal Server Error`.bgRed,
            error,
        })
    }
}

export const loginController = async (req, res) => {
    try{
        const user = await userModel.findOne({email: req.body.email});
        if(!user){
            return res.status(200).send({success: false, message: 'User not found '})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(200).send({
                success: false,
                message: 'email or password is wrong',
            })
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        
        res.status(200).send({
            success: true,
            message: `Login success`.bgGreen,
            token,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Internal Server Error (login)`.bgRed,
            error,
        })
    }
}

export const authController = async (req, res) => {
    try{
        const user = await userModel.findById({_id: req.body.userId});
        user.password = undefined;

        if(!user){
            return res.status(200).send({
                success: false,
                message: `user not found`.red,
            })
        }else{
            res.status(200).send({
                success: true,
                message: 'user data fetch successfully',
                data: user,
            })
        }

    }catch(error){
        console.log(`Error: ${error}`.bgRed);
        res.status(500).send({
            success: false,
            message: 'Auth Error (500)',
            error,
        })
    }
}