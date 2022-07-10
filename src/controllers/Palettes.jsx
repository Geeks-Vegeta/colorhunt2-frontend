import React from "react";
import Navbar from "../components/Navbar";
import Pattern from "../components/Pattern";
import { useParams } from "react-router-dom";



const Palettes=()=>{
    let params = useParams();

    return(
        <>
        <h3>Palettes {params.collection}</h3>
        <Navbar/>
        <Pattern/>
        </>
    )
}

export default Palettes;