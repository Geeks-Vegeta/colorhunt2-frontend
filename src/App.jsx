import React from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./controllers/Nav";

const App=()=>{
  return(
    <>
    <BrowserRouter>
    <Nav/>
    </BrowserRouter>
    </>
   
    )
}

export default App;