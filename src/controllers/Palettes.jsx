import React from "react";
import Pattern from "../components/Pattern";
import { useParams } from "react-router-dom";



const Palettes=()=>{
    let params = useParams();

    return(
        <>
        <Pattern
        isPalettesCollection={true}
        tagurl={params.collection}
        />
        </>
    )
}

export default Palettes;