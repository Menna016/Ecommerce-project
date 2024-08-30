import axios from 'axios';
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ProductItem from '../ProductItem/ProductItem';
import { useQuery } from '@tanstack/react-query';
import useProducts from '../../Hooks/useProducts';
import Loader from '../Loader/Loader';


export default function RecentProducts() {

  const { data: products, isLoading, isError, error } = useProducts();
  
  if (isError) {
    return { error };
  }

  if (isLoading) {
    return <Loader/>
  }
  return (
    <div>
      <div className="grid container mt-16 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          products.map((p) => <ProductItem key={p._id} product={p} />)
        }
      </div>
    </div>
  )
}
