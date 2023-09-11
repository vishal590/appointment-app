import React,{useEffect} from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import {useSelector, useDispatch} from 'react-redux'
import {setUser} from '../redux/features/userSlice'

const HomePage = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user)
  // login user data 
  const getUserData = async () => {
    const res = await axios.post(`/api/v1/user/getUserData`,{},{
      headers:{
        Authorization: "Bearer " + localStorage.getItem('token'),
      }
    })
    dispatch(setUser(res.data.data));
    console.log(res.data)
  }

  useEffect(()=> {
    getUserData();
  },[])

  return (
    <Layout>
      <div>{user?.name}</div>
    </Layout>
  )
}

export default HomePage


// promise is javascript object, its eventual completion or failure of asyncronous operation