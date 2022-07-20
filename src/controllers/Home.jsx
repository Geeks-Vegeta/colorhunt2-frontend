import React, {useState} from "react";
import { useEffect } from "react";
import Pattern from "../components/Pattern";
import axios from "axios";

const Home=()=>{

    const [latestColors, setLatestColors] = useState([]);

    useEffect(()=>{

        const newColors=async()=>{

            const colors = await axios.get("https://colorhunt2-api.herokuapp.com/color/getallrecentcolors/10/0");
            setLatestColors(colors.data[0].results);
        }
        newColors();

    },[])

    return(
        <>
        <Pattern/>
        </>
    )
}

export default Home;