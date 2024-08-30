import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MdDelete } from 'react-icons/md'



export default function CartItem({count , price , product ,upDateQun ,deletItemFromCart}) {
    
    return (
    <>
    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
  <div className="mx-auto w-full flex-none">
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-4 shadow-sm md:p-6">
        <div className="space-y-4 md:flex md:items-center md:gap-6 md:space-y-0">
          <a href="#" className="shrink-0 md:order-1">
            <img className="w-60 dark:block" src={product.imageCover} alt={product?.title} />
          </a>

          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <span className="text-base font-medium text-gray-900 dark:text-black">
              {product?.title}
            </span>
            <div className="md:order-4 md:w-32">
              <p className="text-base font-bold text-gray-900 dark:text-black">{price} EGP</p>
            </div>
            <div className="flex items-center gap-4">
              <button type="button" onClick={()=>deletItemFromCart(product.id)} className="inline-flex items-center text-sm text-red-600 dark:text-red-500">
                <MdDelete className='text-lg' /> Remove
              </button>
            </div>
          </div>

          <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
          <div className="flex items-center md:order-3 md:ml-auto">
            <div className="flex items-center">
              <button type="button"onClick={()=>upDateQun(product.id , count - 1)} id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex p-2 h-8 w-8 items-center justify-center rounded-md border border-green-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-100">
                <svg className="h-2 w-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                  <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                </svg>
              </button>
              <span className='mx-3'>{count}</span>
              <button type="button" id="increment-button" onClick={()=>upDateQun(product.id , count +1)}  data-input-counter-increment="counter-input" className="inline-flex p-2 h-8 w-8 items-center justify-center rounded-md border border-green-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-100">
                <svg className="h-2 w-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                  <path stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          <hr />
    </>
  )
}
