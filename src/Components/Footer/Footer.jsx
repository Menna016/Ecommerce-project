import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export default function Footer() {
    const [counter, setCounter] = useState(0)

    useEffect(() =>{
        console.log('Monting');
    },[])
    return (
      <div className='bg-blue-300 ' >
    <div className=' container p-3 text-center text-white'>
      <h2>Footer</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati numquam excepturi facilis, animi libero explicabo molestias, 
        quibusdam impedit architecto saepe sequi aut illo! Laborum exercitationem eum autem, libero accusantium quo!</p>
    </div>
    </div>
  )
}
