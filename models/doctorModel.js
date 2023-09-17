import mongoose, { mongo } from "mongoose";

const doctorSchema = new mongoose.Schema({
    userId: {
        type: {
            type: String,
        }
    },
    firstName: {
        type: String,
        required: [true, 'first name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'last name is required'],
    },
    phone: {
        type: String,
        required: [true, 'phone number is required'],
    }, 
    email: {
        type: String,
        required: [true, 'email is required'],
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'address is required'],
    },
    specialization: {
        type: String,
        required: [true, 'specialization is required'],
    },
    experience: {
        type: String,
        required: [true, 'experience is required'],
    },
    feesPerConsultation: {
        type: String,
        required: [true, 'fees is required'],
    },
    status:{
        type: String,
        default: 'pending',
    },
    timings: {
        type: Object,
        required: [true, ' work timing is required'],
    }
}, {timestamps: true});

export default mongoose.model('doctors', doctorSchema);