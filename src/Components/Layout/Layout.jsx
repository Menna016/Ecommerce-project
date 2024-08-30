import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'


export default function Layout () {
    

    useEffect(() =>{
        console.log('Monting');
    },[])
    return (
    <div>
    <Navbar/>
       <div className=' items-center justify-center mb-32 '> <Outlet/></div>
    </div>
  )
}
