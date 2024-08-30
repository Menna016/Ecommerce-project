import React, { useContext, useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import Loader from '../Loader/Loader';

export default function WishList() {
  const { getWishLIst, deletItemFromWishList, addItemTOCart } = useContext(CartContext);
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);

  //! Get data of wish list
  async function getLoggedWishList() {
    setLoading(true);
    try {
      const response = await getWishLIst();
      if (response.data.status === 'success') {
        setWishList(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch wish list details:', error);
    } finally {
      setLoading(false);
    }
  }

  //! Delete item from wish list
  async function deleteItemFromWishList(id) {
    try {
      const response = await deletItemFromWishList(id);
      if (response.data.status === 'success') {
        // Update wishList with the new data
        setWishList(response.data.data);
        toast.success('Item removed from wish list!');
      }
    } catch (error) {
      console.error('Failed to delete wish list item:', error);
    }
  }

  //! Add item to cart
  async function addItem(id) {
    try {
      const response = await addItemTOCart(id);
      if (response.data.status === 'success') {
        // Optionally refresh wishList or handle cart update
        toast.success('Item successfully added to cart!');
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  }

  useEffect(() => {
    getLoggedWishList();
  }, []);

  return (
    <>
      <div className="container mt-24">
        <div className="rounded-md p-5 bg-gray-50">
          {loading ? (
            <Loader/>
          ) : wishList.length > 0 ? (
            wishList.map(p => (
              <div key={p._id} className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <div className="mx-auto w-full flex-none">
                  <div className="space-y-6">
                    <div className="rounded-lg p-4 shadow-sm md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img className="w-60 dark:block" src={p.imageCover} alt={p.title} />
                        </a>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <span className="text-base font-medium text-gray-900 dark:text-black">
                            {p.title}
                          </span>
                          <div className="md:order-4 md:w-32">
                            <p className="text-base font-bold text-green-600">{p.price} EGP</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => deleteItemFromWishList(p._id)} 
                              type="button" 
                              className="inline-flex items-center text-sm text-red-600 dark:text-red-500"
                            >
                              <MdDelete className="text-lg" /> Remove
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center md:order-3 md:ml-auto">
                          <button 
                            onClick={() => addItem(p._id)} 
                            type="button" 
                            className="text-black hover:text-white border border-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-8 py-3 text-center me-2 mb-2"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in your wish list.</p>
          )}
        </div>
      </div>
    </>
  );
}
