import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { userContext } from '../store/userContext.jsx'
const Login = React.lazy(() => import('../pages/Login.jsx'))
const UserPage = React.lazy(() => import('../pages/UserPage.jsx'))

const Router = () => {

  const userCtx = useContext(userContext)
  useEffect(() => {
    userCtx.autoLogin()

  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {userCtx.isAuthenticated && <Route path="/" element={<UserPage />} />}
        {!userCtx.isAuthenticated && <Route path="/login" element={<Login />} />}
        <Route path='*' element={<Navigate to={userCtx.isAuthenticated ? "/" : '/login'} />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router