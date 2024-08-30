import axios from 'axios';
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Slider from "react-slick";
import Loader from '../Loader/Loader';





export default function CategcrySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategcry()
  }
  )
  async function getCategcry() {
    const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')

    setCategories(data?.data)

  }

  if (categories.length == 0) {
    return <><Loader /></>
  }


  return (
    <Slider  {...settings}>
      {
        categories.length == 0 ? <Loader /> :
          categories.map(
            function (c) {
              return <>
                <div key={c._id}>
                  <img src={c.image} className='h-[200px] w-full object-cover' alt="" />
                  <h3 className='text-2xl font-sans mt-2'>{c.name}</h3>
                </div>
              </>
            }
          )
      }

    </Slider>
  )
}

