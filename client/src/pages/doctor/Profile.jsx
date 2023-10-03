import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useParams } from 'react-router-dom'
import { Form, Row, Col, Input, TimePicker, message } from "antd";
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import {showLoading, hideLoading} from '../../redux/features/alertSlice'
import axios from "axios";


const Profile = () => {
  const {user} = useSelector(state => state.user)
  const [doctor, setDoctor] = useState(null)
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get doc details
  const getDoctorInfo = async () => {
    try{
      const res = await axios.post('/api/v1/doctor/getDoctorInfo', {userId: params.id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      if(res.data.success){
        setDoctor(res.data.data);
      }
    }catch(error){
      console.log(error);
      message.error('Something went wrong')
    }
  }

  const handleFinish = async(values){
    try{
      dispatch(showLoading());
      const res = await axios.post(`/api/v1/doctor/updateProfile`, {
        ...values,
        userId: user._id
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })

      dispatch(hideLoading());

      if(res.data.success){
        message.success(res.data.message);
        navigate('/');
      }else{
        message.error(res.data.message);
      }

    } catch(error){
      console.log(error);
      message.error('Something went wrong');
    }
  }


  useEffect(() => {
    getDoctorInfo()
  },[])


  return (
    <Layout>
      <h1>Manage profile</h1>
      {doctor && (
        <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={doctor}>
          <h6 className="">Personal Details</h6>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First name"
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last name"
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone no"
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your contact address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email address"
                name="email"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Email Address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Your website"
                name="website"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Your Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your address" />
              </Form.Item>
            </Col>
          </Row>
          <h6 className="">Professional Details</h6>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Experience" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Consultation"
                name="feesPerConsultation"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Fees Per Consultation" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Timings"
                name="timings"
                required
                // rules={[{ required: true }]}
              >
                <TimePicker.RangePicker format="HH:MM" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary">Submit</button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );

  }

export default Profile