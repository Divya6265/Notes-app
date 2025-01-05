import { TiTick } from "react-icons/ti";
import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import { useCreateDateDetails } from "../components/useCreateDate";
import db from "../firebase_config"
import { updateDoc, collection, doc, getDoc } from "firebase/firestore";
import Footer from "../components/Footer"

function EditNotes({ getNotes, showdelete, setShowDelete }) {
  const notesRef = collection(db, "files");
  const [note, setNote] = useState([]);
 
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  let defaultValue = useRef("")

  const navigate = useNavigate();
  const date = useCreateDateDetails();

  useEffect(() => {
    setShowDelete(true);
  }, [setShowDelete]);


  const { id } = useParams();
  // const note = notes.find(item => item.id == id);
  const fetchNote = async () => {
    try {
      const docRef = doc(notesRef, id);
      const noteSnapshot = await getDoc(docRef);
      let note = noteSnapshot.data()
      console.log( "note edit" + note + "  " + note.title + "  " + note.content)
      setNote(note);
      setTitle(note.title  || " ")
      setContent(note.content || " ")
      defaultValue.current = note.content || ""; 
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(()=>{
    fetchNote()
  },[]);


  const handleSubmit = async (e) => {
    e.preventDefault()
    const contentHtml = document.getElementById("content").innerHTML;
    setContent(contentHtml);
    console.log(contentHtml)
    if (title || content) {
      // const newnote = { ...note, title, content, date }
      // const newNotes = notes.map(item => {
      //   if (item.id.toString() === id.toString()) { 
      //     return newnote;
      //   }
      //   return item;
      // });
      const note = doc(notesRef, id);
      await updateDoc(note, {
        title: title,
        content: content,
        date: useCreateDateDetails()
      })
      getNotes();
      navigate("/");
    }

  }

  return (
    <>
      <form className='note__form' action="" onSubmit={handleSubmit}>
        <button className='btn' >  <Link to={`/`}> <IoChevronBack className="backicon" />   </Link> </button>
        <input type="text" name="title" id='title' value={title} onChange={(e) => setTitle(e.target.value)} autoComplete="off" className="title" placeholder='Title' />
        <div className='content' id="content" contentEditable="true" onInput={(e) => setContent(e.currentTarget.textContent)} dangerouslySetInnerHTML={{ __html: defaultValue.current }} autoFocus suppressContentEditableWarning={true} >

        </div>
        {(title.length > 0) || (content.length > 0) ? (
          <button className='btn save__note'>
            <TiTick />
          </button>
        ) : null}

      </form>
      <Footer showdelete={showdelete} setShowDelete={setShowDelete} id={id} getNotes={getNotes} />

    </>

  )
}

export default EditNotes