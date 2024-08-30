import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

export default function Subcategories({ id ,name }) {
  const [isLoading, setIsLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);

  async function getSubCategories(id) {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      setSubcategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getSubCategories(id);
    }
  }, [id]);

  return (
    <div>
      <div className='mt-24 text-center'>  
      <h1 className='text-4xl text-green-600 mb-10 font-bold'>{name} Subcategories</h1>
        {isLoading ? (
          <div className='flex justify-center items-center min-h-screen'>
            <Loader />
          </div>
        ) : (
          <div className='flex justify-center items-center'> 
        
            <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 container">
              {subcategories.map(p => (
               
                <div key={p._id} className="product bg-white border border-gray-200 rounded-lg shadow">   
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{p.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
