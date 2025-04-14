import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Account from './pages/Account.jsx';
import BrandPage from './pages/BrandPage.jsx';
import AddProduct from './pages/AddProduct.jsx';
import Product from './pages/Product.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account' element={<Account />} />
        <Route path='/addbrand' element={<BrandPage />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/product' element={<Product/>} />
      </Routes>
    </Router>
  )
}

export default App
