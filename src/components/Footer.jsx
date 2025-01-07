import React, { createElement } from 'react'
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
  
  const uploadImage = async (e) => {
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





  return (
    <div className='footer__controls'>
      <input type="file" onChange={uploadImage} name="imgUpload" id="imgUpload" accept="image/*" /> 
      <input type="file" onChange={uploadRecorde} name="audioUpload" id="audioUpload" accept="audio/*" /> 
      {showdelete ? <button className="btn delete__btn" onClick={handleDelete}> <RiDeleteBinLine /> </button> : null}
   
    </div>
  )
}

export default footer