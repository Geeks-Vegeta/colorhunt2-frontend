import { MDBContainer, MDBTooltip } from "mdb-react-ui-kit";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"


const About=()=>{
    const navigation = useNavigate();
    return(
        <>
        <MDBContainer className="my-5">
            <div className="back-button">
                <MDBTooltip tag='a' wrapperProps={{ href: '#' }} title="back">
                <BiArrowBack onClick={()=>navigation(-1)} className="cursor" size={25}/>
                </MDBTooltip>
            </div>

            <div className="my-5">
                <h5 className="text-center">About</h5>
                <p className="text-center text-muted w-75 mx-auto">
                Color Picker is an open collection of beautiful color palettes, created by Shreyas Mohite. 
                Color Picker started as a personal small project built to share trendy color combinations between a group of designer friends. 
                The collection scaled up and now being used daily as a handy resources by thousands of people all over the world. 
                Color Picker was created with the 
                goal of celebrating the beauty of colors, and to serve as a go-to resource for color inspiration.
                </p>
            </div>

            <div className="my-5">
                <h5 className="text-center">Who creates the color palettes?</h5>
                <p className="text-center text-muted w-75 mx-auto">
                You, the users, are the ones who create the palettes using Color Picker’s palette creator. 
                The collection is open, and everyone can create and submit their own color combination. 
                That’s how we keep Color Picker diverse, colorful, social and inspiring. 
                Each palette is a public property and not owned by a specific creator, nor by Color Picker.
                </p>
            </div>

            <div className="my-5">
                <h5 className="text-center">Which palettes get featured?</h5>
                <p className="text-center text-muted w-75 mx-auto">
                Color Picker is open, but is also curated. 
                It means that all the palettes are hand-picked by Color Picker’s curators. 
                Each submission of a color palette is being reviewed to make sure it fits the collection’s goals. 
                Each day, the very best submission is being picked up and will be visible on the homepage in the day after.
                </p>
            </div>

            <div className="my-5">
                <h5 className="text-center">Made by Shreyas Mohite</h5>
                <p className="text-center text-muted w-75 mx-auto">
                Color Picker was founded by Shreyas Mohite, web developer from India who is passioned about colors. 
                Color Picker is created since 2021 with the goal of sharing that passion with the world, and provide a handy resource for designers and artists.
                </p>
            </div>
       

        </MDBContainer>
        </>
    )
}

export default About;