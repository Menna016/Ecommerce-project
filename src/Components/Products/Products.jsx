import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CounterContext } from '../../Context/CounterContext';
import { useQuery } from '@tanstack/react-query';
import ProductItem from '../ProductItem/ProductItem';
import axios from 'axios'
import useProducts from '../../Hooks/useProducts';
import Loader from '../Loader/Loader';



export default function Products() {
  const {counterC ,changeCounter} = useContext(CounterContext);

  const { data: products, isLoading, isError, error } = useProducts();

  if (isError) {
    return <h3>{JSON.stringify(error)}</h3>;
  }

  if (isLoading) {
    return <Loader/>
  }
  return (
    <div className='p-3 text-center'>
      <h2> Products</h2>
      {counterC}
      <div className="grid container mt-16 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          products.map((p) =>
            <ProductItem key={p._id} product={p} />)
        }
      </div>

    </div>
  )
}
