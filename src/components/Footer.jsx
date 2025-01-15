import { collection , deleteDoc, doc } from 'firebase/firestore';
import React  from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import {useNavigate} from 'react-router-dom'
import db from "../firebase_config"

function footer({showdelete, id, getNotes}) {

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
  
  const handleDelete = async () => {
    const fileDbRef = collection(db, "files");
    const docRef = doc(fileDbRef, id);
    await deleteDoc(docRef);
    getNotes();
    navigate("/");
}





  return (
    <div className='footer__controls'>
      <input type="file" onChange={uploadImage} name="imgUpload" id="imgUpload" accept="image/*" /> 
      <input type="file" onChange={uploadRecorde} name="audioUpload" id="audioUpload" accept="audio/*" /> 
      {showdelete ? <button type='button'  name='deleteicon'  onClick={handleDelete}> <RiDeleteBinLine className="delete__btn"/> </button> : null}
   
    </div>
  )
}

export default footer