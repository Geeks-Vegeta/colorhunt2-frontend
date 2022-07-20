import React from "react";
import Pattern from "../components/Pattern";
import { useParams } from "react-router-dom";



const Palettes=()=>{
    let params = useParams();

    return(
        <>
        <h3>Palettes {params.collection}</h3>
        <Pattern
        getcolor={false}
        />
        </>
    )
}

export default Palettes;