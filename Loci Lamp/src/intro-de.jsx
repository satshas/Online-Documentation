import './style.css'
import { NavLink, Link } from "react-router-dom";
import HeaderIntro from './Containers/HeaderIntro'


export default function IntroDE() {

    return <>

   <div>
                            <div className='header' style={{position: "absolute", width: "100%"}}>
                                <HeaderIntro />
                            </div>
<div  className="container" >

		<div className="text">
                <img src="Tchibo_Logo_negative.svg" className='responsive' />

<h1 style={{marginBottom:"10px", marginTop: "40px"}} >LOCI LAMP</h1> 
<h2 style={{marginBottom:"40px"}}>Montageanleitung</h2>
<p >Willkommen!</p>
<p>Diese interaktive Anleitung führt dich Schritt für Schritt durch den Montageprozess deiner neuen Lampe.</p>
<p style={{marginBottom:"45px"}}>Bitte beachte, dass das Laden einige Sekunden dauern kann. Bitte verlasse den Bildschirm nicht.</p>
{/*  <button className="btn" onClick={goToApp}>Let's start!</button>
 */} 

			 	 <Link to="/assembly-de" className='btnIntro' style={{ textDecoration: 'none' }}>Los geht's!</Link>
                 
		</div>

	</div>			
    <footer className='footer'>
	<h5 className="text">Entwickelt von InMachines für Tchibo</h5>
	</footer>
	</div> 
    </>
}