import React from 'react'
import {Form, Input, message} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();

  const onFinishHandler = async (values) => {
    try{
        // dispatch(showLoading());
        const res = await axios.post(`/api/v1/user/login`,values);
        // dispatch(hideLoading());
        window.location.reload();
        if(res.data.success){
            // console.log(`type of token: ${typeof res.data.token}`)
            console.log(`token: ${res.data.token}`)
            localStorage.setItem('token', res.data.token);
            message.success('Login Successfully');
            navigate('/');
        }else{
            message.error(res.data.message);
            console.log('erro')
        }
    }catch(error){
        // dispatch(hideLoading());
        console.log(error);
        message.error('Something went wrong')
        console.log('erro')
    }
  }

  return (
    <div className="form-container d-flex flex-column">
      <h3>Login Form</h3>
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-form"
      >
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className="ms-2 ">
          Already not user,register here
        </Link>
        <div className="mt-3">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Login