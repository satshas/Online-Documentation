//Button to toggle between exploded and assembled models

import { useContext, useState, useEffect } from 'react'
import { ModelContext } from './ModelContext.jsx'
import useInterface from '../stores/useInterface.jsx'

let btnTitle

export default function ButtonPartsOut() {

    const { setModelInOut, selectedParts } = useContext(ModelContext)
    const [partsOut, setPartsOut] = useState(true)
    const wiringStep = useInterface((state) => { return state.wiringStep })
    const language = useInterface((state) => { return state.language })

     useEffect(()=>{
        if (language == 'EN'){
                    btnTitle = "Assemble"
        }
            if (language == 'DE'){
                    btnTitle = "montieren"     
        }
     },[language])
    

    const buttonClickPartsOut = () => {

        if (partsOut == false) {
              if (language == 'EN'){
            document.getElementById("partsOut").innerHTML = "Assemble";
    }
        if (language == 'DE'){
            document.getElementById("partsOut").innerHTML = "montieren";
    }
            setPartsOut(true)
            setModelInOut(partsOut)
        }
        else if (partsOut == true) {
 if (language == 'EN'){
            document.getElementById("partsOut").innerHTML = "Explode";
    }
        if (language == 'DE'){
            document.getElementById("partsOut").innerHTML = "explodieren";
    }            setPartsOut(false)
            setModelInOut(partsOut)
        }

    }

    return <>
        {!wiringStep ?
            <button onClick={buttonClickPartsOut} className="btn" id="partsOut">{btnTitle}</button> : null
        }
    </>
}

