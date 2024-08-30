import { createContext, useState } from "react";



export  const CounterContext = createContext(0);

 export default function CounterContextProvider(props){
    const [counterC, setCounter] = useState(0);

    function changeCounter(){
        setCounter(Math.random)
    }

    return <> 
    <CounterContext.Provider value={{counterC , changeCounter}}>
        {props.children}
    </CounterContext.Provider>
    </>
 }