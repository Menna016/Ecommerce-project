import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import CartItem from '../CartItem/CartItem';
import Loader from '../Loader/Loader'; 

export default function Cart() {
  const { getUserCart, upDateTOCart, deletItem, clearYourCart, cartItemNo } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true); 

  //! Fetch cart data
  async function getLoggedUserCart() {
    setLoading(true); 
    try {
      const response = await getUserCart();
      if (response.data.status === 'success') {
        console.log(response.data.data);
        setCartDetails(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch cart details:', error);
    } finally {
      setLoading(false);
    }
  }

  //! Update quantity
  async function upDateQun(id, count) {
    try {
      const response = await upDateTOCart(id, count);
      if (response.data.status === 'success') {
        setCartDetails(response.data.data);
      }
    } catch (error) {
      console.error('Failed to update cart item:', error);
    }
  }

  //! Delete item from cart
  async function deletItemFromCart(id) {
    try {
      const response = await deletItem(id);
      if (response.data.status === 'success') {
        setCartDetails(response.data.data);
      }
    } catch (error) {
      console.error('Failed to delete cart item:', error);
    }
  }

  //! Clear your cart
  async function clearCart() {
    try {
      const response = await clearYourCart();
      if (response.data.status === 'success') {
        setCartDetails(response.data.data);
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='container mt-16'>
      <div className="rounded-md p-12 m-5">
        <div className='flex justify-between mb-8'>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-black">Cart Shop</h2>
          <Link to={'/checkOut/' + cartDetails?._id} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-4 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Check Out
          </Link>
        </div>
        <div className="flex justify-between mb-6">
          <h5 className='text-xl font-medium'>
            Total Price: <span className="text-green-600">{cartDetails?.totalCartPrice ?? 'Loading...'} EGP</span>
          </h5>
          <h5 className='text-xl font-medium'>
            Total Number of Items: <span className="text-green-600">{cartItemNo}</span>
          </h5>
        </div>

        {cartDetails?.products.map(p => (
          <CartItem
            key={p.product._id}
            deletItemFromCart={deletItemFromCart}
            upDateQun={upDateQun}
            count={p.count}
            price={p.price}
            product={p.product}
          />
        ))}

      </div>

      <div className="w-full flex justify-center">
        <button onClick={clearCart} type="button" className="text-black hover:text-black border border-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-sans rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2">
          Clear Your Cart
        </button>
      </div>
    </div>
  );
}
