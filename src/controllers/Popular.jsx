import React from "react";
import Pattern from "../components/Pattern";

const Popular=()=>{
    return(
        <>
       <Pattern
        isColorSet={true}
        url={"https://colorhunt2-api.herokuapp.com/color/popular"}/>
        </>
    )
}

export default Popular;