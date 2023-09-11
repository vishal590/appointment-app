import React from 'react'
import {Form, Input, message} from 'antd'
import '../styles/RegisterStyles.css'
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // form handler
    const onFinishHandler = async(values) => {
        try{    
            // dispatch(showLoading());
            const res = await axios.post(`/api/v1/user/register`, values);
            // dispatch(hideLoading());
            if(res.data.success){
                message.success('Register successful');
                navigate('/login');
            }else{
                message.error(res.data.message);
            }
        }catch(error){
            // dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong')
        }
    }

  return (
    <>
        <div className="form-container d-flex flex-column"> 
        <h3>Register Form</h3>
            <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
                <Form.Item label='Name' name='name'>
                    <Input type='text' required />
                </Form.Item>
                <Form.Item label='Email' name='email'>
                    <Input type='email' required />
                </Form.Item>
                <Form.Item label='Password' name='password'>
                    <Input type='password' required />
                </Form.Item>
                <Link to='/login' className='ms-2 '>Already user login here</Link>
                <div className='mt-3'>      
                    <button className='btn btn-primary' type='submit'>Register</button>
                </div>
            </Form>
        </div>
    </>
  )
}

export default Register