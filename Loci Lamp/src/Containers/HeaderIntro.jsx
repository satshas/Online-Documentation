
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { SlGlobe } from "react-icons/sl";


const HeaderBar = styled.header`
width: 100%;
 padding: 0.5rem 1rem;
     display: flex;
    height: 56px;
    position: relative;
    align-items: center;
    background-color: #000000;
        font-family: Barlow;
    font-size: medium;
`;

// Define MobileMenu component
const MobileMenu = () => {
    return (
        <div className={'mobile-menu'}>
            <a href='#home'>Home</a>
            <a href='#news'>News</a>
            <a href='#shop'>Shop</a>
            <a href='#contact'>Contact</a>
            <a href='#about'>About</a>
            <a href='#privacy'>Privacy Policy</a>
        </div>
    );
};

export default function HeaderIntro() {

    const [isShown, setIsShown] = useState(false);

    const toggleMobileMenu = () => {
        setIsShown(!isShown);
    };

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

            <div className="navMenuIntro" >
                
                <ul >
                    <li><SlGlobe style={{textAlign: "center", fontSize: "30px", paddingTop:"10px"}}/></li>
                    <li><NavLink to="/">EN</NavLink></li>
                    <li><NavLink to="/intro-de">DE</NavLink></li>

                    {/*                     <li><a href="./index.html/" ref={home} className={`${isHomeActive ? 'active' : ''}`} >Assembly Manual</a></li>
                    <li><a href="./howTo.html" ref={howTo} target="_blank" >How To</a></li>
                    <li><a href="#contact">Tools</a></li>
                    <li><a href="#about">Contact</a></li>  */}
                </ul>

            </div>
{/*             <button className='hamburger' onClick={toggleMobileMenu}>
                &#8801;
            </button> */}

        </HeaderBar>
    </>
}