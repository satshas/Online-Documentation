import './style.css'
import { NavLink, Link } from "react-router-dom"
import HeaderIntro from './Containers/HeaderIntro'
import { useEffect } from 'react';


export default function Intro() {


    return <>

   <div>
						<div className='header' style={{position: "absolute", width: "100%"}}>
							<HeaderIntro />
						</div>
<div  className="container">

		<div className="text">
                <img src="Tchibo_Logo_negative.svg" className='responsive' />

<h1 style={{marginBottom:"10px", marginTop: "40px"}} >LOCI LAMP</h1> 
<h2 style={{marginBottom:"40px"}}>assembly instructions</h2>
<p >Welcome!</p>
<p>This interactive guide will walk you step by step through the assembly process of your new lamp.</p>
<p style={{marginBottom:"45px"}}>Please note it might take a few seconds to load. Do not exit the screen.</p>
{/*  <button className="btn" onClick={goToApp}>Let's start!</button>
 */} 

			 	 <Link to="/assembly" className='btnIntro' style={{ textDecoration: 'none' }}>Let's start!</Link>

		</div>

	</div>			
    <footer className='footer'>
	<h5 className="text">Developed by InMachines for Tchibo</h5>
	</footer>
	</div> 
    </>
}