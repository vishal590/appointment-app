import React from 'react'
import Layout from '../components/Layout'
import { Tabs } from 'antd'
import { useSelector } from 'react-redux'

const NotificationPage = () => {
    const {user} = useSelector(state => state.user);
    const handleMarkAllRead = () => {

    }

    const handleDeleteAllRead = () => {

    }


  return (
    <Layout>
        <h1 className='p-2 text-center'>Notification page</h1>
        <Tabs>
            <Tabs.TabPane tab='unRead' key={0}>
                <div className="d-flex justify-content-end">
                    <h4 className='p-2' onClick={handleMarkAllRead}>Mark all read</h4>
                </div>
                {
                    user?.notification.map(msg => (
                        <div className="card" onClick={msg.onClickPath}>
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
            </Tabs.TabPane>
        </Tabs>
    </Layout>
  )
}

export default NotificationPage