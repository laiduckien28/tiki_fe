import React from 'react'
import HomePageComponent from '../Component/HomePage/HomePageComponent'
import ProductlistHot from '../Component/ProductList/ProductlistHot'
import ProductAll from '../Component/ProductList/ProductAll'
import SignInComponent from '../Component/SignInComponent/SignInComponent'
import About from './About'

const HomePage = () => {
  return (
    <div>
      <HomePageComponent />
      <ProductlistHot/>
      <ProductAll/>
      <About/>

      {/* <SignInComponent/> */}
    </div>
  )
}

export default HomePage
