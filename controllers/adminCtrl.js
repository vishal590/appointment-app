import userModel from "../models/userModels.js";
import doctorModel from "../models/doctorModel.js";

export const getAllUsersController = async(req, res) => {
    try{
        const users = await userModel.findOne({_id: req.body.userId})
        // console.log('users:',users)
        res.status(200).send({
            success: true,
            message: 'all users data fetch successfully',
            users,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Unable to get users data (500)',
            error,
        })
    }
}

export const getAllDoctorsController = async(req, res) => {
    try{
        const doctors = await adminModel.find({})
        // console.log('doctors:',doctors)
        res.status(200).send({
            success: true,
            message: 'all doctors data fetch successfully',
            doctors,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'unable to get doctors data (500)', 
            error,
        })
    }
}

export const changeAccountStatusController = async(req, res) => {
    try{
        const {doctorId, status} = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status})
        const user = await userModel.findOne({_id: doctor.userId})
        const notification = user.notification
        notification.push({
            type: 'doctor-account-request-updated',
            message: `Your doctor account request has ${status}`,
            onClickPath: '/notification',
        })
        user.isDoctor === 'approved' ? true : false;
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Account status updated',
            doctor,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in account status ( 500)',
            error,
        })
    }
}