import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaShoppingCart, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { CounterContext } from '../../Context/CounterContext';
import { userContext } from '../../Context/UserContext';
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from '../../Context/CartContext';
import Style from './Navbar.module.css';



export default function Navbar() {

  const { cartItemNo } = useContext(CartContext);
  const { counterC, changeCounter } = useContext(CounterContext);
  const { token, setToken } = useContext(userContext);
  const navigate = useNavigate();

  console.log({ counterC }, "navBAR");

  function logOut() {
    setToken(null)
    navigate('/Login');
  }

  function goToCart(){
    navigate('/cart')
  }
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    console.log('Monting');
  }, [])
  return (
    <div className='bg-gray-50'>
      <nav className="border-gray-200 container fixed top-0 left-0 right-0 z-50 bg-gray-50">
        <div className="max-w-screen-2xl flex flex-wrap gap-8 items-center justify-between mx-auto py-3">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center flex text-3xl gap-1 font-semibold whitespace-nowrap dark:text-black">
              <FaCartShopping className='text-green-600' /> fresh cart
            </span>
            {counterC}
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className="hidden lg:flex lg:w-auto" id="navbar-default">
            <ul className="font-sans flex flex-col lg:flex-row lg:space-x-8 p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg lg:border-0 bg-gray-50 dark:border-gray-700">
              {token && (
                <>
                  <li><Link to="" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-400 lg:p-0 dark:text-black lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-black lg:dark:hover:bg-transparent">Home</Link></li>
                  <li><Link to="cart" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-400 lg:p-0 dark:text-black lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-black lg:dark:hover:bg-transparent">Cart</Link></li>
                  <li><Link to="wishList" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-400 lg:p-0 dark:text-black lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-black lg:dark:hover:bg-transparent">Wish list</Link></li>
                  <li><Link to="products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-400 lg:p-0 dark:text-black lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-black lg:dark:hover:bg-transparent">Products</Link></li>
                  <li><Link to="categories" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-400 lg:p-0 dark:text-black lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-black lg:dark:hover:bg-transparent">Categories</Link></li>
                  <li><Link to="brands" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-400 lg:p-0 dark:text-black lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-black lg:dark:hover:bg-transparent">Brands</Link></li>
                </>
              )}
            </ul>
            <ul className="ms-52 font-sans flex flex-col lg:flex-row lg:space-x-8 p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg lg:border-0 bg-gray-50 dark:border-green-700">
              {!token && (
                <>
                  <li><Link to="Login" className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-black lg:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-black lg:dark:hover:bg-transparent">Login</Link></li>
                  <li><Link to="registor" className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-black lg:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-black lg:dark:hover:bg-transparent">Register</Link></li>
                </>
              )}
              {token && (<>
                <li onClick={goToCart}>
                  <span className="block relative py-2 px-3 text-gray-800 rounded lg:border-0  lg:p-0   cursor-pointer">
                    <FaShoppingCart className=' text-3xl'/>
                   <span className={`${Style.cartNoBtn} absolute text-white rounded-md top-0 end-0 translate-x-1/2 -translate-y-1/2`}>{cartItemNo} </span> 
                  </span>
                </li>
                <li onClick={logOut}>
                  <span className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-black lg:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-black lg:dark:hover:bg-transparent cursor-pointer">
                   Log Out
                  </span>
                </li>
              </>
              )}
              <li><ToggleMode /></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>



  )
}


function ToggleMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))

  //!updateing 
  useEffect(() => {
    const html = document.querySelector('html');
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode])


  return <>
    <button onClick={() => { setIsDarkMode(!isDarkMode) }}>
      {isDarkMode ? <MdDarkMode /> : <MdOutlineDarkMode />}
    </button>
  </>
}
