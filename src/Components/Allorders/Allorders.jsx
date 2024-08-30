import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { CartContext } from '../../Context/CartContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loader from '../Loader/Loader';


export default function Allorders() {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  //! get user orders fn
  async function getUserOrders() {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/` + decoded.id);
      console.log(response.data);
      setAllOrders(response.data)
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log('Monting');
    console.log(decoded);
    getUserOrders()
  }, [])

  return (
    <div>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
            Payment Successful
          </h2>
          <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase
            you can
            check our order summary frm below</p>

          {
            isLoading ? <div className='flex justify-center items-center min-h-screen'>
              <Loader />
            </div> :
              allOrders.map(function (order) {
                return <>
                  <div className="main-box gap-y-6 mb-7 border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full" key={order._id}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                      <div className="data">
                        <p className="font-semibold text-base leading-7 text-black">Order Id :<span className="text-indigo-600 font-medium"> #{order.id}</span></p>
                        <p className="font-semibold text-base leading-7 text-black mt-4">Order Payment : <span className="text-gray-400 font-medium"> {order.createdAt}</span></p>
                      </div>
                      <span className="p-3  font-sans rounded-md text-sm leading-7 text-white bg-indigo-400 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                        <p className="font-sans text-sm leading-7 ">Details : {order.shippingAddress.details}</p>
                        <p className="font-sans text-sm leading-7 ">city : {order.shippingAddress.city}</p>
                        <p className="font-sans text-sm leading-7 ">phone : {order.shippingAddress.phone}</p>
                      </span>
                    </div>
                   {order.cartItems.map(function(orderDetails){
                    return <>
                     <div className="w-full px-3 min-[400px]:px-6">
                      <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                        <div className="img-box max-lg:w-full">
                          <img src={orderDetails.product.imageCover} alt="Premium Watch image" className="aspect-square w-full lg:max-w-[140px] rounded-xl" />
                        </div>
                        <div className="flex flex-row items-center w-full ">
                          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                            <div className="flex items-center">
                              <div className>
                                <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                  {orderDetails.product.title}</h2>

                                <div className="flex items-center ">

                                  <p className="font-medium text-base leading-7 text-black ">Qty : <span className="text-gray-500">{orderDetails.count}</span></p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-5">
                              <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">price</p>
                                  <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">{orderDetails.price} EGP</p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">Brand
                                  </p>
                                  <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                   {orderDetails.product.brand.name}</p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                    Categorie</p>
                                  <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                  {orderDetails.product.category.name}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </>
                   })}
                    <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                      <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">

                        <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">Paid using  <span className="text-gray-500">{order.paymentMethodType}</span></p>
                      </div>
                      <p className="font-semibold text-lg text-black py-6">Total Price: <span className="text-indigo-600"> {order.totalOrderPrice} EGP</span></p>
                    </div>
                  </div>
                </>
              })
          }



        </div>
      </section>


    </div>
  )
}
