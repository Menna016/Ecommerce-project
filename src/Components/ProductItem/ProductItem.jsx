import React, { useContext, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function ProductItem({ product }) {
  const { addItemTOCart, setCartItemNo, addItemTOWishList } = useContext(CartContext);
  const [isInWishList, setIsInWishList] = useState(false); // Local state for heart icon

  //! add item to cart
  async function addItem(id) {
    const response = await addItemTOCart(id);
    console.log(response);

    if (response.data.status === 'success') {
      setCartItemNo(response.data.numOfCartItems);
      toast.success('Item has been successfully added to cart!');
    }
  }

  //! add item to wish list
  async function addItemWishList(id) {
    const response = await addItemTOWishList(id);
    console.log(response);

    if (response.data.status === 'success') {
      setCartItemNo(response.data.numOfCartItems);
      setIsInWishList(!isInWishList); // Toggle wishlist state
      toast.success('Item has been successfully added to wishlist! ❤ ');
    }
  }

  return (
    <div className='product p-3 mt-12'>
      <Link to={`/productDetails/${product._id}`}>
        <div>
          <img src={product.imageCover} className='w-full object-cover' alt="" />
          <p className='text-sm text-green-600 my-2'>{product.category.name}</p>
          <h3 className='font-bold h4 truncate mb-2'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
          <div className="flex justify-between">
            <p>{product.price} EGY</p>
            <p>
              <FaStar className='text-yellow-400 text-xl inline-block' /> {product.ratingsAverage}
            </p>
          </div>
        </div>
      </Link>
      <FaHeart
        onClick={() => addItemWishList(product._id)}
        className={`text-3xl ms-auto me-4 mt-4 cursor-pointer ${isInWishList ? 'text-red-600' : 'text-gray-900'}`}
      />
      <div className="text-center">
        <button onClick={() => addItem(product._id)} className='btn bg-green-600 w-3/4 text-white px-4 py-2 rounded-md'>
          + Add
        </button>
      </div>
    </div>
  )
}
