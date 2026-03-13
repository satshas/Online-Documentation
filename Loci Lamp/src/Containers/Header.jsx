
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { SlGlobe } from "react-icons/sl";
import { MdClose, MdMenu } from "react-icons/md";
import useInterface from "../stores/useInterface";


const HeaderBar = styled.header`
width: 100%;
 padding: 0.5rem 1rem;
     display: flex;
    height: 56px;
    position: relative;
    align-items: center;
    background-color: #fff;
        font-family: Barlow;
    font-size: medium;
`;
let mainLanguage
let assemblyTitle

export default function Header() {

    const [isShown, setIsShown] = useState(false);
    const language = useInterface((state) => { return state.language })
       
            if (language == 'EN'){
                        mainLanguage = "/assembly"
                        assemblyTitle = "Assembly Instructions"
            }
            if (language == 'DE'){
                        mainLanguage = "/assembly-de"
                        assemblyTitle = "Montageanleitung"
            }


    const toggleMobileMenu = () => {
        setIsShown(!isShown);
    };

     useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 890) {
            setIsShown(false);
          } 
        };
    
        window.addEventListener("resize", handleResize);
        handleResize();
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    const home = useRef()
    const howTo = useRef()
    const contact = useRef()
    const about = useRef()

    // adding the states 
    const [isActive, setIsActive] = useState(false);
    const [isHomeActive, setIsHomeActive] = useState(true);
    const [isHowToActive, setIsHowToActive] = useState(false);

    //add the active class
    const toggleActiveClass = () => {
        setIsActive(!isActive);
    };

   

    //clean up function to remove the active class
    const removeActive = () => {
        setIsActive(false)
    }
    const homeActive = () => {
        setIsHomeActive(true)
        setIsHowToActive(false);
    }
    const howToActive = () => {
        setIsHomeActive(false)
        setIsHowToActive(true)
    }

    return <>
        <HeaderBar>
            <div >
                <img src="./InMachines_Logo_positive_RGB.svg"  className="mainLogo" />
                <img src="./InMachines_Logo_positive_RGB_r.svg" className="reducedLogo" />
            </div>
            <h1 className="Title" >LOCI LAMP</h1>

            <div className={isShown? 'navMenuMobile': 'navMenu'} >
               <ul>
                    <li><NavLink to="/">intro</NavLink></li>
                    <li><NavLink to="/laser">Laser Cutting</NavLink></li>
                                        <li><NavLink to={mainLanguage}> {assemblyTitle} </NavLink></li>
                    <li><SlGlobe style={{textAlign: "center", fontSize: "30px", paddingTop:"10px"}}/></li>
                    <li><NavLink to="/assembly">EN</NavLink></li>
                    <li><NavLink to="/assembly-de">DE</NavLink></li>
                    
                    {/*   
                    <li><NavLink to='/HowTo' target="_blank">How To</NavLink></li>                   */}
                </ul> 

            </div>
            <button className='hamburger' onClick={toggleMobileMenu}>
                {isShown ? <MdClose />: <MdMenu/> }
            </button>

        </HeaderBar>
    </>
}