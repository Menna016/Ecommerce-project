import axios from 'axios'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";

import Style from './productDetails.module.css'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import Loader from '../Loader/Loader'


//!6428de2adc1175abc65ca05b

export default function ProductDetailss({product}) {
  const {addItemTOCart, setCartItemNo ,addItemTOWishList} = useContext(CartContext);
  const [isInWishList, setIsInWishList] = useState(false);
  //! add item to cart
  
  async function addItem(id){
  const response = await addItemTOCart(id);
  console.log(response);

  if(response.data.status == 'success'){
    setCartItemNo(response.data.numOfCartItems);
    toast.success('it has been Successfully added!')
  }
  }
  
  //! add item to wish list
  async function addItemWishList(id) {
    const response = await addItemTOWishList(id);
    console.log(response);

    if (response.data.status == 'success') {
      setCartItemNo(response.data.numOfCartItems);
      setIsInWishList(!isInWishList); // Toggle wishlist state
      toast.success('Item has been successfully added to wishlist! ❤ ');
    }
  }

  const { id } = useParams()
  const [counter, setCounter] = useState(0)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const { data: productDetails, isLoading, isError, error } = useQuery({
    queryKey: ['productDetails' , id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (data) => data.data.data,
  })

  if (isError) {
    return { error };
  }

  return (<>
    <div>
      {isLoading ? <Loader/> :
        <div className="container mt-20  grid sm:grid-cols-12">
          <div className="col-span-4 py-5">
            <Slider className='w-full' {...settings}>
              <div>
                <img src={productDetails.images[0]} alt="" />
              </div>
              <div>
                <img src={productDetails.images[1]} alt="" />
              </div>
              <div>
                <img src={productDetails.images[2]} alt="" />
              </div>
              <div>
                <img src={productDetails.images[3]} alt="" />
              </div>
            </Slider>
          </div>
          <div className="col-span-8 py-5 self-center ps-12">
            <h2 className=' text-4xl font-sans mb-2'>{productDetails.title}</h2>
            <p className=' mb-4'> {productDetails.description} </p>
            <div className="flex justify-between" >
              <p> {productDetails.price} EGY </p>
              <p><FaStar className=' text-yellow-400 inline-block' />{productDetails.ratingsAverage}  </p>
            </div>
            <div className="  flex items-center">

              <button onClick={() => addItem(productDetails.id)} className={`${Style.addcartColor} w-3/4 mx-auto text-white py-2 mt-3 rounded-md`}>
                + Add
              </button>

              <FaHeart  onClick={()=>addItemWishList(productDetails._id)} className={`text-3xl ms-auto me-4 mt-4 cursor-pointer ${isInWishList ? 'text-red-600' : 'text-gray-900'}`}/>
            </div>
          </div>

        </div>}
    </div>
  </>
  )
}
