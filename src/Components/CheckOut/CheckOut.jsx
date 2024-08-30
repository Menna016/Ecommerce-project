import React, { useContext } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik';
import { FaSpinner } from 'react-icons/fa';
import * as yup from 'yup'
import { CartContext } from '../../Context/CartContext';
import { useParams } from 'react-router-dom';



export default function CheckOut() {
  const {cartId} = useParams()
const {checkOutSession} = useContext(CartContext)
  //!validation from yup library
  const schema = yup.object().shape({
    details: yup.string().required('details is required'),
    phone: yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'most be egypiten number'),
    city: yup.string().required('city is required').matches(/^[a-z]{4,30}$/, 'at least 4 char or number ...'),
  })

  const [isLoading, setIsLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    },
    //!submit
    onSubmit: handelSubmit,

    validationSchema: schema,
  })

  async function handelSubmit(values) {
  const response = await  checkOutSession(cartId, values);
  console.log(response.data.session.url);
  window.location.href =response.data.session.url ;
  
  }


  return (
    <div className=' container'>
      <h2 className='text-3xl font-bold py-5 mt-20 text-sky-800'>Check Out</h2>

      <form onSubmit={formik.handleSubmit} className="py-5 mx-auto">

        <div className="mb-3">
          <label htmlFor="details" className="block mb-2 text-lg font-sans text-gray-900">Details :</label>
          <input name="details"
            type='text'
            id="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} className="bg-gray-50 border border-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          {/* alert */}
          {formik.errors.details && formik.touched.details ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 mt-3" role="alert">
              {formik.errors.details}
            </div>
            : null}
        </div>

        <div className="mb-6">
          <label htmlFor="city" className="block mb-2 text-lg font-sans text-gray-900">City :</label>
          <input name="city"
            type='text'
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} className="bg-gray-50 border border-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          {/* alert */}
          {formik.errors.city && formik.touched.city ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 mt-3" role="alert">
              {formik.errors.city}
            </div>
            : null}
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className="block mb-2 text-lg font-sans text-gray-900">Phone :</label>
          <input name="phone"
            id="phone"
            type='tel'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} className="bg-gray-50 border border-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
          {/* alert */}
          {formik.errors.phone && formik.touched.phone ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 mt-3" role="alert">
              {formik.errors.phone}
            </div>
            : null}
        </div>

        <button disabled={isLoading} type="submit" className="text-blue-500 w-full mt-7 hover:text-black border border-blue-400 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-sans rounded-lg text-base px-5 py-2 text-center me-2 mb-2">
          {isLoading ? <FaSpinner className=' animate-spin' /> : "Pay Now"}
        </button>
      </form>

    </div>
  )
}
