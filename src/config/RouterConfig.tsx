import React from "react"
import { Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { ProductDetailPage } from "../pages/ProductDetailPage"

export const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/product-detail/:productId' element={<ProductDetailPage />} />
      </Routes>
    </div>
  )
}
