import React,{useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./controllers/Nav";
import { MDBContainer } from "mdb-react-ui-kit"
// import {isMobile} from 'react-device-detect';
import "./App.css";
const App=()=>{

  const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
    }

    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);


  return(
    <>

      {width <= 768?(
        <>
        <MDBContainer fluid className='my-3'>

          <div className="mobile">
            <div className="text-center">
              <img src={"/logos.png"} alt="image" className='logo-image-size' />
              <span className='img-logo font-weight-bold'>Color Picker </span>
            </div>
            
            <p className="text-center">Application is available</p>
            <p className="text-center">on <a href="https://bit.ly/3Holy55" target="_blank">Android</a> and  <a href="https://bit.ly/3Holy55" target="_blank">ios</a></p>


          </div>
        </MDBContainer>
        
        </>
      ):(
        <>
            <BrowserRouter>
              <Nav/>
            </BrowserRouter>
        </>
      )}
   
    </>
   
    )
}

export default App;
