import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader'; // Assuming you have a Loader component

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDiv, setShowDiv] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null); // Track the selected brand ID

  const handleDivClick = (brandId) => {
    setSelectedBrandId(brandId);
    setShowDiv(true);
  };

  const handleCloseDiv = () => {
    setShowDiv(false);
    setSelectedBrandId(null); // Clear selected brand ID when closing
  };

  const getSelectedBrand = () => {
    return brands.find((brand) => brand._id === selectedBrandId);
  };

  useEffect(() => {
    const disableScroll = () => {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`; // Preserve scroll position
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
      const scrollY = document.body.style.top.replace('px', '');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY, 10) || 0); // Restore scroll position
    };

    if (showDiv) {
      disableScroll();
    } else {
      enableScroll();
    }

    // Cleanup function to restore scrolling on component unmount
    return () => {
      enableScroll();
    };
  }, [showDiv]);

  async function getBrands() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(response.data.data);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    } finally {
      setLoading(false); // Set loading to false after the data has been fetched or if there is an error
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  const selectedBrand = getSelectedBrand(); // Get the selected brand details

  return (
    <div className='mt-28 p-3 text-center'>
      <h1 className='text-4xl text-green-600 mb-10 font-bold'>All Brands</h1>
      {showDiv && selectedBrand && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
          onClick={handleCloseDiv}>
          <div
            className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'
            onClick={(e) => e.stopPropagation()}>
            <h2 className='text-2xl text-green-400 font-bold mb-4'>{selectedBrand.name}</h2>
            <img
              className='w-full h-auto object-cover mb-4'
              src={selectedBrand.image}
              alt={selectedBrand.name}/>
            <button
              onClick={handleCloseDiv}
              className='px-4 py-2 bg-green-500 text-white rounded'>
              Close
            </button>
          </div>
        </div>
      )}
      {loading ? (
        <div className='flex justify-center items-center min-h-screen'>
          <Loader />
        </div>
      ) : (
        <div className='grid gap-3 lg:grid-cols-4 md:grid-cols-2 container'>
          {brands.map((brand) => (
            <div
              key={brand._id}
              onClick={() => handleDivClick(brand._id)} // Pass the brand ID to the handler
              className='product w-full max-w-sm bg-white border border-gray-200 rounded-md shadow hover:rounded-md cursor-pointer'
            >
              <a href='#'>
                <img
                  className='p-8 rounded-t-lg'
                  src={brand?.image}
                  alt={brand.name}
                />
              </a>
              <div className='px-5 pb-5'>
                <a href='#'>
                  <h5 className='text-lg font-sans tracking-tight text-gray-900'>
                    {brand.name}
                  </h5>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
