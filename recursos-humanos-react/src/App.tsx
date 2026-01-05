import React from 'react'
import { Route, Routes } from 'react-router'
import { Login } from './pages/Login'
import Dashboard from './pages/protected/Dashboard'


function App() {

  return (
    <>
    <Routes >
      <Route path="/" element={<Login />} />
      { /* Rutas protegidas */ }
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App
