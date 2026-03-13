import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Containers/Header";
import H1 from './pages/H1.jsx';
import H2 from './pages/H2.jsx';
import LaserMenu from "./Containers/laserMenu.jsx";
import HowToText from "./Containers/HowToText.jsx";
import LaserText from "./Containers/laserText.jsx";
import { ModelContext } from "./Components/ModelContext.jsx";
import { useContext } from "react";

    const reloadPage = ()=> {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      //window.location.reload();
          console.log(reloadCount)

    } else {
      sessionStorage.removeItem('reloadCount');
    } 
  }


export default function LaserInstructions(){
    

    reloadPage()

        let {path, laserMenuCount, setLaserCount, laserTitleArray} = useContext(ModelContext)

        const buttonClickNext = () => {

        laserMenuCount++
        setLaserCount(laserMenuCount)

    }

    const buttonClickPrevious = () => {

        laserMenuCount--
        setLaserCount(laserMenuCount)

    }

  
    return <>
      <div className='header'>
                            <Header />
                        </div>
                        <div id='app'>
                            <LaserMenu/>

                            <section id="currentLaserArea">
                                
                                
                                            <h2 id="laserTitleArea">{path === 'undefined' ? '' : path}
                                            </h2>
                                            <nav className='currentStepBar' style={{zIndex:1}} >
                                                <div className="laserNavi">
 {laserMenuCount >= 1 ?
            <button onClick={buttonClickPrevious} className="btn" id="nextStep" > &#10094; </button> : null}

        {laserTitleArray && laserMenuCount + 1 <= laserTitleArray.length - 1 ? <button onClick={buttonClickNext} className="btn" id="nextStep">&#10095; </button> : null}
                                                </div>
                                                
    
                                            </nav>
                            
                                    
                            
                            
                                            <article className="textArea">
                                                <LaserText/> 
                                                    <Routes>
                                                        <Route path='/H1' element={<H1 />} />
                                                        <Route path='/H2' element={<H2 />} /> 
                            
                                                    </Routes>
                                                     
                                            </article>

                                        </section>
                        </div>
    
    
    
</>
}