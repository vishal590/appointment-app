import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message } from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.user);
    const handleMarkAllRead = async() => {
        try{
            dispatch(showLoading());
            const res = await axios.post(
              "/api/v1/user/get-all-notification",
              { userId: user._id },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error(res.data.message);
            }
        }catch(error){
            dispatch(hideLoading())
            console.log(error);
            message.error('something went wrong');
        }
    }

    const handleDeleteAllRead = async() => {
        try{
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/delete-all-notification', {userId: user._id}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message);
            }else{
                message.error(res.data.message);
            }
        }catch(error){
            console.log(error);
            message.error('something went wrong')
        }
    }


  return (
    <Layout>
        <h1 className='p-2 text-center'>Notification page</h1>
        <Tabs>
            <Tabs.TabPane tab='unRead' key={0}>
                <div className="d-flex justify-content-end">
                    <h4 className='p-2' onClick={handleMarkAllRead} style={{cursor: 'pointer'}}>Mark all read</h4>
                </div>
                {
                    user?.notification.map(msg => (
                        <div className="card" onClick={() => navigate(msg.onClickPath)} >
                            <div className="card-text">
                                {msg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
            <Tabs.TabPane tab='Read' key={1}>
                <div className="d-flex justify-content-end">
                    <h4 className='p-2' onClick={handleDeleteAllRead}>Delete all read</h4>
                </div>
                {
                    user?.seenotification.map(msg => (
                        <div className="card" onClick={() => navigate(msg.onClickPath)} >
                            <div className="card-text">
                                {msg.message}
                            </div>
                        </div>
                    ))
                }
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage