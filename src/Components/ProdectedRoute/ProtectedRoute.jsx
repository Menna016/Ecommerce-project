import React, { Children, useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { userContext } from '../../Context/UserContext'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute(props) {
  const {token} = useContext(userContext)
  if(token){
    //! he login
  return props.children 
  }else{
    //! he dont login
   return  <Navigate to= {'/Login'}></Navigate>
  }
    return (
    <div>
      <h2>ProtectedRoute</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati numquam excepturi facilis, animi libero explicabo molestias, 
        quibusdam impedit architecto saepe sequi aut illo! Laborum exercitationem eum autem, libero accusantium quo!</p>
    </div>
  )
}
