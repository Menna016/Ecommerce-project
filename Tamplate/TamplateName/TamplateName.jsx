import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Style from './Tamplate.module.css'


export default function TamplateName() {
    const [counter, setCounter] = useState(0)

    useEffect(() =>{
        console.log('Monting');
    },[])
    return (
    <div>
      <h2>TamplateName</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati numquam excepturi facilis, animi libero explicabo molestias, 
        quibusdam impedit architecto saepe sequi aut illo! Laborum exercitationem eum autem, libero accusantium quo!</p>
    </div>
  )
}
