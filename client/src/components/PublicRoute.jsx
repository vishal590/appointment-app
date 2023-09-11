import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
  if(localStorage.getItem('token')){
    return children;
  }else{
    return <Navigate to='/login' />
  }
}

export default PublicRoute