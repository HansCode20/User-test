import React from 'react'
import { getToken } from '../utils/auth'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const token = getToken()

  return (
    token ? <Outlet/> : <Navigate to="/login" replace/>
  )
}

export default ProtectedRoute