import React from "react";
import {Routes, Route} from "react-router-dom";
import Collection from "./Collection";
import Home from "./Home";
import Error from "./Error";
import Popular from "./Popular";
import Random from "./Random";
import Palettes from "./Palettes";

const Nav=()=>{
    return(
        <>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/popular" element={<Popular/>}/>
            <Route exact path="/random" element={<Random/>}/>
            <Route exact path="/collection" element={<Collection/>}/>
            <Route exact path="/palettes/:collection" element={<Palettes/>}/>
            <Route exact path="*" element={<Error/>}/>
        </Routes>

        </>
    )
}

export default Nav;