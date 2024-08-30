import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';
import { data } from 'autoprefixer';

export default function Registor() {

  //!validation from yup library
  const schema = yup.object().shape({
    name: yup.string().required('name is empty').min(3, 'at least 3 char ...').max(30),
    email: yup.string().required('email is empty').email('email is false'),
    password: yup.string().required('password is empty').matches(/^.{6,30}$/, 'at least 5 char or number ...'),
    rePassword: yup.string().required('rapassword is empty').oneOf([yup.ref('password')], 'false password'),
    phone: yup.string().required('phone is empty').matches(/^01[0125][0-9]{8}$/, 'most be egypiten number')
  })
  const [errMsg, setErrMsg] = useState('')
  const [counter, setCounter] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
   const {setToken} = useContext(userContext)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    //!submit
    onSubmit: handelSubmit, 
    validationSchema: schema,

  })

  async function handelSubmit(values) {
    setIsLoading(true);
    try {
      console.log(values);
      const rep = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      console.log(rep);
      if(rep.data.message == "success"){
        navigate('/')
        setToken(rep.data.token)
      }
    } catch (error) {
      setErrMsg(error.response.data.message)
      console.log(error.response.data.message);

    }finally{
      setIsLoading(false)
    }
  }

  console.log(formik.errors);

  return (
    <div className='container'>
      <h2 className='text-3xl font-bold py-5 text-sky-800'>Registor</h2>

      {/*  massge from back end*/}
      {errMsg ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errMsg}
      </div> : null}

      <form onSubmit={formik.handleSubmit} className="py-5 mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input type="name"
            name="name"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
          <label htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UserName</label>

          {/* alert */}
          {formik.errors.name && formik.touched.name ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.name}
            </div>
            : null}

        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
          <label htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UserEmail</label>
          {/* alert */}
          {formik.errors.email && formik.touched.email ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>
            : null}

        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
          <label htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          {/* alert */}
          {formik.errors.password && formik.touched.password ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.password}
            </div>
            : null}

        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="Password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
          <label htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RePassword</label>
          {/* alert */}
          {formik.errors.rePassword && formik.touched.rePassword ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.rePassword}
            </div>
            : null}

        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input type="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer" placeholder=" " required />
          <label htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
          {/* alert */}
          {formik.errors.phone && formik.touched.phone ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.phone}
            </div>
            : null}

        </div>
        <button 
        disabled={isLoading}
        type="submit" className="text-white my-8 bg-red-200 disabled:text-gray-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800">
          {isLoading ? <FaSpinner className=' animate-spin'/> : "Submit"}
          </button>
      </form>



    </div>
  )
}
