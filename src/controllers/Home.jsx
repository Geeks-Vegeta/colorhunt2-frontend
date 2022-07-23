import React from "react";
import Pattern from "../components/Pattern";

const Home=()=>{

    return(
        <>
        <Pattern
        isColorSet={true}
        url={"https://colorhunt2-api.herokuapp.com/color/getallrecentcolors"}/>
        </>
    )
}

export default Home;