import React from 'react'
import {Form, Input} from 'antd'
import '../styles/RegisterStyles.css'

const Register = () => {

    // form handler
    const onFinishHandler = (values) => {
        console.log(values)
    }

  return (
    <>
        <h3>Register Form</h3>
        <div className="form-container ">
            
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
                <button className='btn btn-primary' type='submit'>Register</button>
            </Form>
        </div>
    </>
  )
}

export default Register