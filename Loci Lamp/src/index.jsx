import './style.css'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import Assembly from './assembly.jsx';
import Intro from './intro.jsx';
import IntroDE from './intro-de.jsx';
import AssemblyDE from './assembly-de.jsx';
import LaserInstructions from './laser.jsx';
import { ModelProvider } from './Components/ModelContext.jsx';

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>

<ModelProvider>
	<Router>
		   <Routes>
 								<Route path='/' element={<Intro />} />
								<Route path='/assembly' element={<Assembly />} />
								<Route path='/intro-de' element={<IntroDE/>} />
								<Route path='/assembly-de' element={<AssemblyDE />} />
								<Route path='/laser' element={<LaserInstructions />} />

        </Routes>
	   
	</Router> 
	</ModelProvider>
     </>

)

