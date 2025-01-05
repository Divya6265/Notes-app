import { useState, useEffect } from 'react'
import { TiTick } from "react-icons/ti";
import { v4 as uuid } from 'uuid';
import { useCreateDateDetails } from "../components/useCreateDate";
import { IoChevronBack } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import db from "../firebase_config"
import { addDoc, collection } from 'firebase/firestore';
import Footer from "../components/Footer"

function CreateNotes({getNotes, showdelete, setShowDelete }) {
 
  useEffect(()=>{
    setShowDelete(false);  
  }, setShowDelete );
  

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault()
    const contentHtml = document.getElementById("content").innerHTML;
    setContent(contentHtml);
    if (title || content) {
      // const note = { id: uuid(), title: title, content: content, date: useCreateDateDetails() }
      // setNotes(prevNotes => [note, ...prevNotes])
      // navigate(`/edit-note/${note.id}`);

      const notesRef = collection(db, "files");
      try {
       const docRef =  await addDoc(notesRef,{
          title : title,
          content : content,
          date : useCreateDateDetails()
        })
        // console.log("Note added into db");
        getNotes();
      navigate(`/edit-note/${docRef.id}`);
      }catch(err){
        console.error(err);
      }
    }

  }



  return (
    <>
      <form className='note__form' action="">
        <button className='btn' >  <Link to={`/`}> <IoChevronBack className="backicon" />   </Link> </button>
        <input type="text" name="title" id='title' value={title} onChange={(e) => setTitle(e.target.value)} autoComplete='off' autoFocus className="title" placeholder='Title' />
        <div className='content' id='content' onInput={(e) => setContent(e.currentTarget.textContent)} suppressContentEditableWarning={true} contentEditable="true">

        </div>
        {(title.length > 0) || (content.length > 0) ? (
          <button onClick={handleSumbit} className='btn save__note'>
            <TiTick />
          </button>
        ) : null}
      </form>
      <Footer showdelete = {showdelete} setShowDelete = {setShowDelete}/>

    </>
  )
}

export default CreateNotes