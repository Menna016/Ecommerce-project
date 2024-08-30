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

export default function Login() {

  //!validation from yup library
  const schema = yup.object().shape({
    email: yup.string().required('email is empty').email('email is false'),
    password: yup.string().required('password is empty').matches(/^.{6,30}$/, 'at least 5 char or number ...'),
  })
  const [errMsg, setErrMsg] = useState('')
  const [counter, setCounter] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
 const { setToken} = useContext(userContext)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    //!submit
    onSubmit: handelSubmit,
    //! validateOnMount: true ,

    //!validation
    //!validate: function(values){
    //!  let error ={};
    //!  if(values.name == ""){
    //! error.name = "name is required"
    //!  }else if(!/^[A-z][a-z]{3,8}$/.test(values.name)){
    //!   error.name = "name is false ..." } 
    //!  return error ; }

    validationSchema: schema,

  })

  async function handelSubmit(values) {
    setIsLoading(true);
    try {
      console.log(values);
      const rep = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      
      if(rep.data.message == "success"){
        console.log(rep.data.token);
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
      <h2 className='text-3xl font-bold py-5 text-sky-800'>Login</h2>

      {/*  massge from back end*/}
      {errMsg ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errMsg}
      </div> : null}

      <form onSubmit={formik.handleSubmit} className="py-5 mx-auto">
      


        <div className="mb-3">
          <label htmlFor="email" className="block mb-2 text-lg font-sans text-gray-900">UserEmail :</label>
          <input  name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} className="bg-gray-50 border border-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          {/* alert */}
          {formik.errors.email && formik.touched.email ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3" role="alert">
              {formik.errors.email}
            </div>
            : null}
        </div> 


        <div className="mb-3">
          <label htmlFor="password" className="block mb-2 text-lg font-sans text-gray-900">UserPassword :</label>
          <input  type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password" id="password"  className="bg-gray-50 border border-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
            {/* alert */}
            {formik.errors.password && formik.touched.password ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-3 " role="alert">
              {formik.errors.password}
            </div>
            : null}
        </div> 



        <button 
        disabled={isLoading}
        type="submit" className="text-white my-8 bg-red-200 disabled:text-gray-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800">
          {isLoading ? <FaSpinner className=' animate-spin'/> : "Login"}
          </button>
      </form>



    </div>
  )
}
