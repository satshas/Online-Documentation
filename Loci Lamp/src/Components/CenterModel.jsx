import { useBounds } from '@react-three/drei'
import { useEffect, useContext, useRef } from 'react'
import { ModelContext } from "./ModelContext.jsx"
import { useFrame, useThree } from '@react-three/fiber'
import useInterface from '/stores/useInterface.jsx'
import { invalidate } from "@react-three/fiber"

export default function CenterModel({ cameraControlsRef }) {

    let { visibleObj, modelProperties, selectedPartsModel, selectedParts, currentObject, setCamera, partBtnState, currentStepObject } = useContext(ModelContext)
    const api = useBounds()

    const cameraPositionTag = useInterface((state) => { return state.cameraPositionTag })


    useEffect(() => {
        if (visibleObj) {
            api.refresh(visibleObj).fit().clip()
            invalidate()
        }
        else {
            api.refresh(currentStepObject).fit().clip()
            invalidate()
        }

    }, [currentStepObject, cameraPositionTag])


}