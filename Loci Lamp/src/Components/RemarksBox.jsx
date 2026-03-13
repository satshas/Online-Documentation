import { useRef, useState } from "react";
import { useCollapse } from "react-collapsed";
import StepRemarks from "/Containers/StepRemarks";
import { LuAlertCircle } from "react-icons/lu";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import useInterface from "/stores/useInterface";


export default function RemarksBox() {

    const remarks = useRef()
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
        const boxVisibility = useInterface((state) => { return state.isVisible })
    

    return <>
        <button 
        type="button" {...getToggleProps({
            onClick: () => { setExpanded((prevExpanded) => !prevExpanded) },
        })} 
        className="remarksCollapsible"
        style={{ position: 'absolute', top: '20px', left: '20px', visibility: `${boxVisibility}`,   
  justifyContent:"space-between",
  alignItems: "center"}}>
            {isExpanded ? <><LuAlertCircle size={22} /> <MdOutlineExpandLess /></> : <><LuAlertCircle size={22}/> <MdOutlineExpandMore /></>}
        </button>
        <div ref={remarks} className="remarksContent" {...getCollapseProps()}>
            <StepRemarks />
        </div>
    </>
}