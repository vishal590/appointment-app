import React from "react";
import Layout from "../components/Layout";
import { Form, Row, Col, Input, TimePicker, message } from "antd";
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import axios from "axios";

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user);


  const handleFinish = async (values) => {
    try{
      dispatch(showLoading())
      const res = await axios.post(`/api/v1/user/apply-doctor`, {
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
        message.success(res.data.success);
        navigate('/');
      }else{
        message.error(res.data.success);
      }

    }catch(error){
      dispatch(hideLoading())
      console.log(error);
      message.error('Something went wrong')
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
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
              <TimePicker.RangePicker  format='HH:MM'/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24} lg={8}>
          <button className="btn btn-primary">Submit</button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
