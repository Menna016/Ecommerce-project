import { createContext, useEffect, useState } from "react";



export  const userContext = createContext(0);

 export default function UserContextProvider(props){

    const [token, setToken] = useState(localStorage.getItem('token'));
    
    //! handel refresh => get token from localStorage
    useEffect(()=> {
        token ? 
        localStorage.setItem('token', token) :
        localStorage.removeItem('token')
    }, [token]);
   
    return <>
    <userContext.Provider value={{token, setToken}}>
        {props.children}
    </userContext.Provider>
    </> 
 }