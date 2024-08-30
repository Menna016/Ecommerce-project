import { useState } from 'react'
import './App.css'
import Categories from './Components/Categories/Categories'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Registor from './Components/Registor/Registor'
import NotFound from './Components/NotFound/NotFound'
import Products from './Components/Products/Products'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProdectedRoute/ProtectedRoute'
import ProductDetailss from './Components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import WishList from './Components/WishList/WishList'
import CartContextProvider from './Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import CheckOut from './Components/CheckOut/CheckOut'
import Allorders from './Components/Allorders/Allorders'
import Subcategories from './Components/Subcategories/Subcategories'


function App() {
  const routing = createBrowserRouter(
    [
      {
        element: <Layout />, path: "", children: [
          { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute> },
          { path: "wishList", element: <ProtectedRoute><WishList /></ProtectedRoute> },
          { path: "categories", element: <ProtectedRoute> <Categories /></ProtectedRoute> },
          { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
          { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
          { path: "productDetails/:id", element: <ProtectedRoute><ProductDetailss /></ProtectedRoute> },
          { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
          { path: "checkOut/:cartId", element: <ProtectedRoute> <CheckOut /> </ProtectedRoute> },
          { path: "allorders", element: <ProtectedRoute> <Allorders /> </ProtectedRoute> },
          { path: "registor", element: <Registor /> },
          { path: "Login", element: <Login /> },
          { path: "*", element: <NotFound /> },


        ]
      }
    ])

  const myClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
        refetchInterval: 1000,
        refetchIntervalInBackground: false,
        gcTime: 5000,
        retry: (counter, err) => {
          if (counter > 5) {
            return false;
          }
          return confirm.apply('try again ?')
        }
      }
    }
  });

  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserContextProvider>
          <CartContextProvider>
            <CounterContextProvider>
              <RouterProvider router={routing} />
            </CounterContextProvider>
          </CartContextProvider>
        </UserContextProvider>
        <Toaster toastOptions={{
          style: { backgroundColor: "green", color: "white" },
          position: "top-right",
        }} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default App
