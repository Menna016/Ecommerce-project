import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Slider from "react-slick";


export default function MainSlider() {
    const [counter, setCounter] = useState(0)

    useEffect(() =>{
        console.log('Monting');
    },[])
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:false ,
    };
    return (
      <div className="flex justify-center my-16">
    <div className=' container grid grid-cols-2 w-full max-w-4xl md:grid-cols-4'>
      <div className="col-span-2">
      <Slider {...settings}>
        <div>
           <img src="/images/sliderImage1-1.jpg" className=' w-full object-cover'  alt=""  />
        </div>
        <div>
        <img src="/images/sliderImage1-2.jpg" className=' w-full object-cover'  alt=""  />
        </div>
        <div>
        <img src="/images/sliderImage1-3.jpg" className=' w-full object-cover'  alt=""  />
        </div>
        
      </Slider>
       
      </div>
      <div className="col-span-2  bg-red-500">
      <img src="/images/sliderImage3.jpg" alt=""  className=' w-full object-cover' />
      <img src="/images/sliderImage2.jpg" alt=""  className=' w-full object-cover' />


      </div>

      
    </div></div>
  )
}
