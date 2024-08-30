import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import MainSlider from './../MainSlider/MainSlider';
import CategcrySlider from './../CategcrySlider/CategcrySlider';
import RecentProducts from '../RecentProducts/RecentProducts';


export default function Home() {

  return (
   <>
   <MainSlider/>
   <CategcrySlider/>
   <RecentProducts/>
   </>
  )
}
