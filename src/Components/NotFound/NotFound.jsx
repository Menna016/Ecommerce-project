import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export default function NotFound() {
    const [counter, setCounter] = useState(0)

    useEffect(() =>{
        console.log('Monting');
    },[])
    return (
      <div className="flex items-center justify-center h-screen">
      <img src="/images/not-found.webp" alt="Not Found" className="max-w-full max-h-full" />
  </div>
  )
}
