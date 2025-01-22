import React from 'react'
import {BrowserRouter as Router,Routes,Route, RouterProvider} from 'react-router-dom'
import Register from './Components/Register'
import Home from './Components/Home'
import LoginPage from './Components/Login'
import Nav from './Components/Nav'
import ProfileInfo from './Components/ProfilePage'
import Wishlist from './Components/Wishlist'
import Profile from './Components/Profile'
import Cart from './Components/Cart'
import SellerPage from './Components/SellerPage'
import AddProduct from './Components/AddProduct'
import ProductDetailsPage from './Components/ProductDetailPage'
import CategoryPage from './Components/Category'
import ProductDetails from './Components/ProductDetails'
import VerifyEmail from './Components/EmailVerify'
import ResetPassword from './Components/ResetPass'
import MyOrder from "./Components/MyOrder"
import SellerOrder from './Components/SellerOrder'

import './App.css'

function App() {

  return (
    <>
    <Router>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        
        <Route path='/profileinfo' element={<ProfileInfo/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/verifyEmail' element={<VerifyEmail/>}/>
        <Route path='/sellerpage' element={<SellerPage/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/products/:productId' element={<ProductDetailsPage/>}/>
        <Route path='/category/:category' element={<CategoryPage/>}/>
        <Route path='/product/:productId' element={<ProductDetails/>}/>
        <Route path="/myOrder" element={<MyOrder/>}></Route>
        <Route path="/sellerOrder" element={<SellerOrder/>}></Route>







      </Routes>
    </Router>
    </>
  )
}

export default App
