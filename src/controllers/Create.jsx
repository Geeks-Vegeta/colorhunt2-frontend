import React,{ useState, useEffect} from "react";
import { MDBContainer, MDBTooltip  } from 'mdb-react-ui-kit';
import { HexColorPicker } from "react-colorful";
import "./create.css"
import { BiArrowBack } from "react-icons/bi"
import { FiSend } from "react-icons/fi";
import { tag } from "./Tags";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from 'react-select';
import moment from "moment"; //importing moment for data

// import { WithContext as ReactTags } from 'react-tag-input';



const Create=()=>{
    const navigation = useNavigate();
    const [submitButton, setSubmitButton] = useState(false);
    const [tagsSuggetions, setTagSuggetions] = useState(tag);
    const [selectedOption, setSelectedOption] = useState(null);


    const [color1,setcolor1]=useState("#a5a2a2");
    const [hidden1,sethidden1]=useState(false);

    const [color2,setcolor2]=useState("#c2c2c2");
    const [hidden2,sethidden2]=useState(false);

    const [color3,setcolor3]=useState("#9c9c9c");
    const [hidden3,sethidden3]=useState(false);

    const [color4,setcolor4]=useState("#666665");
    const [hidden4,sethidden4]=useState(false);


    useEffect(()=>{

      const checkSubmitButton=()=>{
        if(color1 !=="#a5a2a2" || color2 !=="#c2c2c2" || color3 !=="#9c9c9c" || color4 !=="#666665"){
          setSubmitButton(true);
        }
  
      }
      checkSubmitButton();

    },[color1, color2, color3, color4]);

    

    const show1=()=>{
      sethidden1(!hidden1)
      sethidden2(false)
      sethidden4(false)
      sethidden3(false)

    }


  const show2=()=>{
      sethidden2(!hidden2);
      sethidden1(false)
      sethidden4(false)
      sethidden3(false)
  }


  const show3=()=>{
      sethidden3(!hidden3);
      sethidden1(false)
      sethidden2(false)
      sethidden4(false)
  }


  const show4=()=>{
      sethidden4(!hidden4)
      sethidden3(false);
      sethidden1(false)
      sethidden2(false)
  }


  const CreatePalettes=async()=>{
    try {

      const create = await axios.post("https://colorhunt2.onrender.com/color/add",{
        "color1":color1,
        "color2":color2,
        "color3":color3,
        "color4":color4,
        "tags":selectedOption,
        "date":moment().format()

      })
      console.log(create.data);
      console.log(create.data._id);
      // setTimeout(()=>{
      // },5000);
      navigation(`/color/${create.data._id}`);
      
    } catch (error) {
      console.log(error);
    }
  }


    // const suggestions = tagsSuggetions.map(country => {
    //   return {
    //     id: country.tag,
    //     text: country.tag
    //   };
    // });

    const options = tagsSuggetions.map(country => {
      return {
        value: country.tag,
        label: country.tag
      };
    });

    // const KeyCodes = {
    //   comma: 188,
    //   enter: 13
    // };

    // const delimiters = [KeyCodes.comma, KeyCodes.enter];

  
    // const handleDelete = i => {
    //   setTags(tags.filter((tag, index) => index !== i));
    // };
  
    // const handleAddition = tag => {
    //   setTags([...tags, tag]);
    // };
  
    // const handleDrag = (tag, currPos, newPos) => {
    //   const newTags = tags.slice();
  
    //   newTags.splice(currPos, 1);
    //   newTags.splice(newPos, 0, tag);
  
    //   // re-render
    //   setTags(newTags);
    // };
  
    // const handleTagClick = index => {
    //   console.log('The tag at index ' + index + ' was clicked');
    // };
    
    return(
        <>
        <MDBContainer className="my-5" fluid>
          <div className="back-button">
            <MDBTooltip tag='a' wrapperProps={{ href: '#' }} title="back">
              <BiArrowBack onClick={()=>navigation(-1)} className="cursor" size={25}/>
            </MDBTooltip>

            </div>
          
          <h5 className="text-center text-grey">New Color Palette</h5>
          <p className="text-center text-grey">Create a new palette and contribute to Color Hunt’s collection</p>

          <div className="color-picker-card mx-auto">
            <div onClick={show1} className="pallet-1" style={{backgroundColor:color1}}></div>
            <div onClick={show2} className="pallet-2" style={{backgroundColor:color2}}></div>
            <div onClick={show3} className="pallet-3" style={{backgroundColor:color3}}></div>
            <div onClick={show4} className="pallet-4" style={{backgroundColor:color4}}></div>
          </div>

          <div className="color-picker">
                {hidden1 && (
                        <>
                          <HexColorPicker color={color1} onChange={setcolor1} />  
                        
                        </>
                    )}
                    {hidden2 && (
                        <>
                          <HexColorPicker color={color2} onChange={setcolor2} />  
                        </>
                    )}
                    {hidden3 && (
                        <>
                          <HexColorPicker color={color3} onChange={setcolor3} />  
                        </>
                    )}
                    {hidden4 && (
                        <>
                          <HexColorPicker color={color4} onChange={setcolor4} />  
                        </>
                    )}
          </div>
          
          {/* {/* suggetions */}
          
          <p className="text-center text-grey my-3">Add Tags</p>

          {/* <p className="my-3 text-grey text-center">suggetions</p>
          {color1!=="#a5a2a2"?(
            <>
            <p>{GetColorName(color1)}</p>
            </>
          ):(
            <>
            </>
          )} */}

          {/* tags bar */}
          <div className="tags mt-1 mb-5 mx-auto">
              {/* <ReactTags
              classNames={{
                tags: 'tagsClass',
                tagInput: 'tagInputClass',
                tagInputField: 'tagInputFieldClass',
                selected: 'selectedClass',
                tag: 'tagClass',
                remove: 'removeClass',
                suggestions: 'suggestionsClass',
                activeSuggestion: 'activeSuggestionClass',
                editTagInput: 'editTagInputClass',
                editTagInputField: 'editTagInputField',
                clearAll: 'clearAllClass',
              }}
              tags={tags}
              suggestions={suggestions}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              inputFieldPosition="top"
              autocomplete
            /> */}

             <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  isMulti={true}
                  options={options}
                />
          </div>
         
          {submitButton?(
            <>
              <div className="text-center mb-2">
                <button onClick={CreatePalettes} className="submit-palettes"><FiSend/>  Submit Palettes</button>
              </div>
            </>
          ):(
            <>
            </>
          )}
          
       </MDBContainer>
            
        </>
    )
}

export default Create; 