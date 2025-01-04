import React from 'react'
import { IoFileTrayOutline } from "react-icons/io5";
import { MdOutlineAudioFile } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import {useNavigate, useParams} from 'react-router-dom'

function footer({showdelete, notes, id, setNotes}) {

  // const uploadImage = (e) => {
  //   document.getElementById('imgUpload').click()
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const img = document.createElement('img');
  //       img.src = e.target.result;
  //       document.getElementById('content').innerHTML += img.outerHTML;
  //     }
  //     reader.readAsDataURL(file);
  //     e.target.value = "";
  //   }
  // }
  
  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        document.getElementById('content').innerHTML += img.outerHTML;
      }
      reader.readAsDataURL(file);
    }
  }

  const uploadRecorde = (e) => {
    
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = e.target.result;
        let seletion = window.getSelection();
        let range = seletion.getRangeAt(0);
        range.insertNode(audio);
      }

      reader.readAsDataURL(file);
      e.target.value = "";

    }
  }
  const navigate = useNavigate();
  
  const handleDelete = () => {
    setNotes(notes.filter(note => note.id !== id))
    navigate("/");
}



  // const insertCheckBox = () => {
  //   const content = document.getElementById("content")
  //   const checkbox = document.createElement('input');
  //   checkbox.type = "checkbox";
  //   let seletion = window.getSelection();
  //   console.log("seletuon" + seletion);
  //   // let seletedText = seletion.toString()
  //   let range = seletion.getRangeAt(0);
  //   range.insertNode(checkbox);

  // }

  // const insertCheckBox = () => {
  //   const content = document.getElementById("content");
  //   const items = Array.from(content.children); // Get all child div elements

  //   // Loop through each child item
  //   items.forEach((item) => {
  //     // Check if a checkbox already exists in the item
  //     if (!item.querySelector("input[type='checkbox']")) {
  //       // Create a checkbox
  //       const checkbox = document.createElement("input");
  //       checkbox.type = "checkbox";
  //       checkbox.style.marginRight = "5px"; // Add some space between the checkbox and text

  //       // Insert the checkbox at the beginning of the item
  //       item.prepend(checkbox);
  //     }
  //   });
  // };



  return (
    <div className='footer__controls'>
      <input type="file" onChange={uploadImage} name="imgUpload" id="imgUpload" accept="image/*" /> 
      <input type="file" onChange={uploadRecorde} name="audioUpload" id="audioUpload" accept="audio/*" /> 
      {showdelete ? <button className="btn delete__btn" onClick={handleDelete}> <RiDeleteBinLine /> </button> : null}
   
    </div>
  )
}

export default footer