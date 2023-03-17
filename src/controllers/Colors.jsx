import React, { useEffect, useState } from "react";
import Pattern from "../components/Pattern";
import { useParams } from "react-router-dom";
import axios from "axios";


const Colors=()=>{
    let params = useParams();
    const [color1, setColor1] = useState();
    const [color2, setColor2] = useState();
    const [color3, setColor3] = useState();
    const [color4, setColor4] = useState();
    const [tags, setTags] = useState();
    const [likes, setLikes] = useState();
    const [date, setDate] = useState();

    // "62d52ad3cf45080016bde64e"


    useEffect(()=>{

        const getColors = async()=>{

            try {

                const color = await axios.get(`https://colorhunt2.onrender.com/color/getcolor/${params.id}`);
                setColor1(color.data.color1);
                setColor2(color.data.color2);
                setColor3(color.data.color3);
                setColor4(color.data.color4);
                setTags(color.data.tags);
                setLikes(color.data.likes);
                setDate(color.data.date);
                
            } catch (error) {
                console.log(error);
            }
        
        
        }
        getColors();
    
    },[params.id])

    

    return(
        <>
        <Pattern
            getcolor={true}
            color1={color1}
            color2={color2}
            color3={color3}
            color4={color4}
            tags={tags}
            likes={likes}
            date={date}
            id={params.id}

        />
        </>
    )
}

export default Colors;