import doctorModel from "../models/doctorModel";



export const getDoctorInfoController = async(req, res) => {
    try{
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success: true,
            message: 'data fetch successfully',
            data: doctor,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetching doctor data (500)',
            error,
        })
    }
}

export const updateProfileController = async (req, res) => {
    try{
        const doctor = await doctorModel.findOneAndUpdate({userId: req.boy.userId}, req.body)
        res.status(201).send({
            success: true,
            message: 'doctor profile udpated successfully',
            data: doctor,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in update profile',
            error,
        })
    }
}