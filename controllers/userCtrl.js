import userModel from "../models/userModels.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import doctorModel from "../models/doctorModel.js";

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

export const applyDoctorController = async(req, res) => {
    try{
        const newDoctor = await doctorModel({...req.body, status: 'pending'})
        await newDoctor.save();
        const adminUser = await userModel.findOne({isAdmin: true})
        const notification = adminUser.notification;
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors',
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, {notification});
        res.status(201).send({
            success: true,
            message: 'Doctor Account creted successfully'
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Internal server error (applyDoctorController)`.bgRed,
            error,
        })
    }
}

export const getAllNotificationController = async (req, res) => {
    try{
        const user = await userModel.findOne({_id: req.body.userId})
        const seenotification = user.seenotification;
        const notification = user.notification;
        seenotification.push(...notification);
        user.notification = [];
        user.seenotification = notification;
        const updateUser = await user.save();
        res.status(200).send({
            success: true,
            message: 'all notification mark as read',
            data: updateUser,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Bad request (getAllNotification)',
            error,
        })
    }
}

export const deleteAllNotificationController = async (req, res) => {
    try{
        const user = await userModel.findOne({_id: req.body.userId})
        user.notification = [];
        user.seenotification = [];
        const updateUser = user.save();
        updateUser.password = undefined;
        res.status(200).send({
            success: true,
            message: 'Notification deleted succefully',
            data: updateUser,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'unable to delete all notification',
            error,
        })
    }
}