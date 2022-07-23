import React, { useState, useEffect} from 'react';
import { 
  MDBContainer, 
  MDBRow, 
  MDBCol, 
  MDBTable, 
  MDBTableHead, 
  MDBTableBody,
  } from 'mdb-react-ui-kit';
import { GetColorName } from 'hex-color-to-color-name';
import { AiOutlineStar, AiOutlineHeart, AiFillFileAdd, AiFillHeart } from "react-icons/ai";
import { BsLink45Deg, BsDownload } from "react-icons/bs";
import { FaMixcloud } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import "./pattern.css"
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import hexRgb from 'hex-rgb';
import moment from "moment"; //importing moment for date
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toJpeg } from 'html-to-image';
import ReactPaginate from 'react-paginate';



export default function Pattern(props) {
  const [collection, setCollection] = useState([]);
  const [Colors, setLatestColors] = useState([]);
  const [likes, setLikes] = useState();
  const [offset, setOffSet] = useState(0);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);



   //getting data from  localstorage
   const getItem=()=>{
    //local storage name
    const allist=localStorage.getItem("color-picker-favorite");
    //if exists
    if(allist){
    //return again data to local storage
    return JSON.parse(localStorage.getItem('color-picker-favorite'));
    }else{
    //else reaturn empty data
    return [];
    }
  }


  const [favo,setfavo]=useState(getItem()); //state for favo likes colors


  useEffect(()=>{
    setLikes(props.likes)

    const getAllCollections=async()=>{

      try {
        if(props.url){
         
          const colors = await axios.get(`${props.url}/100/${offset}`);
          setLatestColors(colors.data[0].results);
        }
        const coll = await axios.get("https://colorhunt2-api.herokuapp.com/tag/getcollectiontag");
        setCollection(coll.data);
        
      } catch (error) {
        console.log(error);
        
      }

    }
    getAllCollections();

  },[props.likes, props.url, offset]);

  const showToast=()=>{
    toast.dark('copied', {
      position: "top-center",
      autoClose: 300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  const DownloadImage=()=>{
    toJpeg(document.getElementById('color-picker-card'))
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = `${window.location.href}.jpg`;
    link.href = dataUrl;
    link.click();
  });
  }

  //storing data of individual color
  const saveToLocalStorage=(items)=>{
    //creating a storing of name
    localStorage.setItem('color-picker-favorite',JSON.stringify(items)); 
  }

  const likeColor=async()=>{

    try {
      await axios.put(`https://colorhunt2-api.herokuapp.com/color/like/${props.id}`);
      const getColor = await axios.get(`https://colorhunt2-api.herokuapp.com/color/getcolor/${props.id}`);
      const adds=[...favo,getColor.data] //taking previous data of favo and adding new data of color
      setfavo(adds); //adding it to favos
      saveToLocalStorage(adds); //saving add in local storage
      setLikes(likes+1);


      
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{

    const newColors=async()=>{
      try {
        const endOffset = itemOffset + 6;
        setCurrentItems(Colors.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(Colors.length / 6));
      } 
      catch (error) {
      } 
    }
    newColors();

  },[offset, itemOffset, Colors, props.url])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 6) % Colors.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

 
  const unlikeColor=async()=>{

    try {
      await axios.put(`https://colorhunt2-api.herokuapp.com/color/unlike/${props.id}`);
      let items=JSON.parse(localStorage.getItem("color-picker-favorite"));

      items = items.filter((data, id)=>
        data._id!==props.id
      )
      setfavo(data=>data.filter((val, id)=>{
        return val._id!==props.id;
      }))
      saveToLocalStorage(items); //saving add in local storage
      setLikes(likes-1);

      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <MDBContainer fluid className='my-4'>
      <MDBRow>
        <MDBCol lg="2" className='pattern-i'>
            <div className="list-urls">
                <ul>
                    <li className='my-3'><AiOutlineStar size={"1.5rem"} className="mx-2"/>
                    <NavLink className={({ isActive }) => (isActive ? 'text-dark' : 'grey-color')} to="/">New</NavLink></li>
                    <li className='my-3'><FaMixcloud size={"1.5rem"} className="mx-2"/>
                    <NavLink className={({ isActive }) => (isActive ? 'text-dark' : 'grey-color')} to="/popular">Popular</NavLink></li>
                    <li className='my-3'><TbArrowsRandom size={"1.5rem"} className="mx-2"/>
                    <NavLink className={({ isActive }) => (isActive ? 'text-dark' : 'grey-color')} to="/random">Random</NavLink></li>
                    <li className='my-3'><AiOutlineHeart size={"1.5rem"} className="mx-2"/>
                    <NavLink className={({ isActive }) => (isActive ? 'text-dark' : 'grey-color')} to="/collection">Collection</NavLink></li>
                    <li className='my-3'><AiFillFileAdd size={"1.5rem"} className="mx-2"/>
                    <NavLink className={({ isActive }) => (isActive ? 'text-dark' : 'grey-color')} to="/create">Create</NavLink></li>
                </ul>
            </div>
            <div className="list-collection my-2">
              <ul>
                {collection.map((data, idx)=>{
                  return(
                    <>
                      <li className='mx-3 my-3'>
                        <NavLink className={({ isActive }) => (isActive ? 'text-dark' : 'grey-color')} to={`/palettes/${data.tag}`}>{data.tag}</NavLink></li>
                    </>
                  )
                })}
              </ul>
            </div>
        </MDBCol>

        <MDBCol className='pattern-ii' lg="8">
          {props.getcolor?(
            <>
            <div className="w-50 mx-auto">
              <div id="color-picker-card">
                  <div className="pallet-1" style={{backgroundColor:props.color1}}></div>
                  <div className="pallet-2" style={{backgroundColor:props.color2}}></div>
                  <div className="pallet-3" style={{backgroundColor:props.color3}}></div>
                  <div className="pallet-4" style={{backgroundColor:props.color4}}></div>
                </div>
            </div>

             
              <div className="down-like-link w-75 mx-auto">
                <ul>
                  {favo?(
                    <>
                    {favo.some(item => item._id === props.id)?(
                    <>
                      <li onClick={unlikeColor} className='cursor li'><AiFillHeart size={25} className='mx-2 text-black'/> {likes?likes:0}</li>

                    </>
                  ):(
                    <>
                      <li onClick={likeColor} className='cursor li'><AiOutlineHeart size={25} className='mx-2'/> {likes?likes:0}</li>
                    </>
                  )}
                    </>
                  ):(
                    <>
                      <li onClick={likeColor} className='cursor li'><AiOutlineHeart size={25} className='mx-2'/> {likes?likes:0}</li>
                    </>
                  )}
                  
                  <li onClick={DownloadImage} className='cursor li'><BsDownload size={25} className='mx-2'/>Image</li>
                    <CopyToClipboard text={window.location.href}>
                      <li onClick={showToast} className='cursor li'><BsLink45Deg size={25} className='mx-2'/>
                        <span>Link</span>
                      </li>
                    </CopyToClipboard>

                  {props.date?(
                    <>
                      <li className='my-3 text-muted'>{moment(props.date).fromNow(true)}</li>
                    </>
                  ):(
                    <>
                    </>
                  )}
                </ul>

              </div>


              <MDBTable className='my-5 mx-auto w-75'>
                <MDBTableHead>
                  <tr>
                    <th scope='col'>
                      <span className='color-circle-box cursor' style={{backgroundColor:props.color1, color:props.color1}}>ok</span>
                    </th>
                    <th scope='col'>
                    <span className='color-circle-box cursor' style={{backgroundColor:props.color2, color:props.color2}}>ok</span>
                    </th>
                    <th scope='col'>
                    <span className='color-circle-box cursor' style={{backgroundColor:props.color3, color:props.color3}}>ok</span>
                    </th>
                    <th scope='col'>
                    <span className='color-circle-box cursor' style={{backgroundColor:props.color4, color:props.color4}}>ok</span>
                    </th>
                  </tr>
                </MDBTableHead>

                <MDBTableBody>
                  <tr>
                  {props.color1 && props.color2 && props.color3 && props.color4?(
                      <>
                        <CopyToClipboard text={props.color1}>
                          <td onClick={showToast} className='cursor'>{props.color1}</td>
                        </CopyToClipboard>
                        <CopyToClipboard text={props.color2}>
                          <td onClick={showToast} className='cursor'>{props.color2}</td>
                        </CopyToClipboard>
                        <CopyToClipboard text={props.color3}>
                          <td onClick={showToast} className='cursor'>{props.color3}</td>
                        </CopyToClipboard>
                        <CopyToClipboard text={props.color4}>
                          <td onClick={showToast} className='cursor'>{props.color4}</td>
                        </CopyToClipboard>
                      </>
                    ):(
                      <>
                      </>
                    )}
                  </tr>

                  <tr>
                    {props.color1 && props.color2 && props.color3 && props.color4?(
                      <>
                        <CopyToClipboard text={hexRgb(props.color1, {format: 'css'})}>
                          <td onClick={showToast} className='cursor'>{hexRgb(props.color1, {format: 'css'})}</td>
                        </CopyToClipboard>
                        <CopyToClipboard text={hexRgb(props.color2, {format: 'css'})}>
                          <td onClick={showToast} className='cursor'>{hexRgb(props.color2, {format: 'css'})}</td>
                        </CopyToClipboard>
                        <CopyToClipboard text={hexRgb(props.color3, {format: 'css'})}>
                          <td onClick={showToast} className='cursor'>{hexRgb(props.color3, {format: 'css'})}</td>
                        </CopyToClipboard>
                        <CopyToClipboard text={hexRgb(props.color4, {format: 'css'})}>
                          <td onClick={showToast} className='cursor'>{hexRgb(props.color4, {format: 'css'})}</td>
                        </CopyToClipboard>
                      </>
                    ):(
                      <>
                      </>
                    )}
                  </tr>

                  <tr>
                    {props.color1 && props.color2 && props.color3 && props.color4?(
                      <>
                       <CopyToClipboard text={GetColorName(props.color1)}>
                       <td onClick={showToast} className='cursor'>{GetColorName(props.color1)}</td>
                        </CopyToClipboard>
                        <CopyToClipboard text={GetColorName(props.color2)}>
                       <td onClick={showToast} className='cursor'>{GetColorName(props.color2)}</td>
                        </CopyToClipboard>
                        <CopyToClipboard text={GetColorName(props.color3)}>
                       <td onClick={showToast} className='cursor'>{GetColorName(props.color3)}</td>
                        </CopyToClipboard>
                        <CopyToClipboard text={GetColorName(props.color4)}>
                       <td onClick={showToast} className='cursor'>{GetColorName(props.color4)}</td>
                        </CopyToClipboard>
                      </>
                    ):(
                      <>
                      </>
                    )}
                  </tr>
                  {/* hexRgb('#cd2222cc', {format: 'css'}); */}
                </MDBTableBody>
              </MDBTable>

              {/* tags */}
              {props.tags?(
                <>
                </>
              ):(
                <>
                </>
              )}

            </>
          ):(
            <>
            </>
          )}

          {props.isColorSet?(
            <>
             
             <MDBRow>
              {currentItems?(
                <>
                {currentItems.map((data,idx)=>{
                return(
                  <>
                    <MDBCol size="4" className='my-2'>
                      <Link to={`/color/${data._id}`}>
                        <div className="medium-palette" key={idx}>
                          <div className="medium-pallet-1" style={{backgroundColor:data.color1}}></div>
                          <div className="medium-pallet-2" style={{backgroundColor:data.color2}}></div>
                          <div className="medium-pallet-3" style={{backgroundColor:data.color3}}></div>
                          <div className="medium-pallet-4" style={{backgroundColor:data.color4}}></div>
                        </div>
                      </Link>
                    </MDBCol>
                  </>
                )
              })}
                </>
              ):(
                <>
                <h3>Loading ...</h3>
                </>
              )}
                
            </MDBRow>
            <div className="text-center mt-3 w-50 mx-auto">
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
            

            </>
          ):(
            <>
            </>
          )}

          {props.isCollection?(
            <>
            <h5>My Collections</h5>
            
            <MDBRow>
                {favo.map((data,idx)=>{
                return(
                  <>
                    <MDBCol size="4" className='my-2'>
                      <Link to={`/color/${data._id}`}>
                        <div className="medium-palette">
                          <div className="medium-pallet-1" style={{backgroundColor:data.color1}}></div>
                          <div className="medium-pallet-2" style={{backgroundColor:data.color2}}></div>
                          <div className="medium-pallet-3" style={{backgroundColor:data.color3}}></div>
                          <div className="medium-pallet-4" style={{backgroundColor:data.color4}}></div>
                        </div>
                      </Link>
                    </MDBCol>
                  </>
                )
              })}
            </MDBRow>

           

            </>
          ):(
            <>
            </>
          )}

          
        </MDBCol>
        <MDBCol lg="2">
            <h5>Most Popular Palettes of Color Picker</h5>
            <p>The community's favorite color palettes</p>
            <hr className='w-75 mx-auto' />
            <p className='text-center text-muted'>
              <Link className='text-center text-muted' to="/about">About</Link></p>
            <p className='text-center text-muted size'>Made with <AiFillHeart className='pink'/> By Shreyas Mohite</p>
        </MDBCol>
      </MDBRow>
      <ToastContainer/>
    </MDBContainer>
  );
} 