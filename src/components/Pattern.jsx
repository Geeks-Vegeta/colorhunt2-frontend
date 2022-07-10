import React, {useState, useEffect} from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import { FaMixcloud } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import "./pattern.css"
import axios from "axios";
import {Link} from "react-router-dom";

export default function Pattern() {

  const [collection, setCollection] = useState([]);

  useEffect(()=>{

    const getAllCollections=async()=>{

      try {

        const coll = await axios.get("https://colorhunt2-api.herokuapp.com/tag/getcollectiontag");
        setCollection(coll.data);
        console.log(coll.data);
        
      } catch (error) {
        console.log(error);
        
      }

    }
    getAllCollections();
  },[])


  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol lg="2" className='pattern-i'>
            <div className="list-urls">
                <ul>
                    <li className='my-3'><AiOutlineStar size={"1.5rem"} className="mx-2"/>
                    <Link className='grey-color' to="/">New</Link></li>
                    <li className='my-3'><FaMixcloud size={"1.5rem"} className="mx-2"/>
                    <Link className='grey-color' to="/popular">Popular</Link></li>
                    <li className='my-3'><TbArrowsRandom size={"1.5rem"} className="mx-2"/>
                    <Link className='grey-color' to="/random">Random</Link></li>
                    <li className='my-3'><AiOutlineHeart size={"1.5rem"} className="mx-2"/>
                    <Link className='grey-color' to="/collection">Collection</Link></li>
                </ul>
            </div>
            <div className="list-collection my-2">
              <ul>
                {collection.map((data, idx)=>{
                  return(
                    <>
                      <li className='mx-3 my-3'>
                        <Link className='grey-color' to={`/palettes/${data.tag}`}>{data.tag}</Link></li>
                    </>
                  )
                })}
              </ul>
            </div>
        </MDBCol>
        <MDBCol lg="8">
          One of three columns
        </MDBCol>
        <MDBCol lg="2">
            <h5>Most Popular Palettes of Color Hunt</h5>
            <p>The community's favorite color palettes</p>

        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}