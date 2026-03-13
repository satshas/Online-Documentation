
//Buttons to navigate to the next and previous Steps

import { useContext, useState, useEffect } from 'react'
import { ModelContext } from './ModelContext.jsx'
import useInterface from '../stores/useInterface.jsx'

    let btnTitlePrevious
    let btnTitleNext

export default function ButtonNext() {

    let { setStepPosition, stepCount, stepList } = useContext(ModelContext)
    const language = useInterface((state) => { return state.language })

    
     useEffect(()=>{
        if (language == 'EN'){
                    btnTitlePrevious = "Previous Step"
                    btnTitleNext = "Next Step"
        }
            if (language == 'DE'){
                    btnTitlePrevious = "Vorheriger Schritt" 
                    btnTitleNext = "Nächster Schritt"
        }

     },[language])

          useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 890) {
            btnTitlePrevious = ""
                    btnTitleNext = ""
          } 
else{
     if (language == 'EN'){
                    btnTitlePrevious = "Previous Step"
                    btnTitleNext = "Next Step"
        }
            if (language == 'DE'){
                    btnTitlePrevious = "Vorheriger Schritt" 
                    btnTitleNext = "Nächster Schritt"
   
        }
}
        };
    
        window.addEventListener("resize", handleResize);
        handleResize();
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    const buttonClickNext = () => {

        stepCount++
        setStepPosition(stepCount)

    }
    const buttonClickPrevious = () => {

        stepCount--
        setStepPosition(stepCount)

    }

    return <>
        {stepCount >= 1 ?
            <button onClick={buttonClickPrevious} className="btn" id="nextStep" > &#10094; {btnTitlePrevious} </button> : null}

        {stepList && stepCount + 1 <= stepList.length - 1 ? <button onClick={buttonClickNext} className="btn" id="nextStep">{btnTitleNext} &#10095; </button> : null}
    </>
}

