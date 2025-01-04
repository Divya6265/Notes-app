import { TiTick } from "react-icons/ti";
import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import { useCreateDateDetails } from "../components/useCreateDate";
import Footer from "../components/Footer"

function EditNotes({ notes, setNotes, showdelete, setShowDelete }) {

  useEffect(()=>{
    setShowDelete(true);
  }, [setShowDelete]);
  

  const { id } = useParams();
  const note = notes.find(item => item.id == id);

  const [title, setTitle] = useState(note.title || " ")
  const [content, setContent] = useState(note.content || " ")

  const defaultValue = useRef(note.content)

  const navigate = useNavigate();
  const date = useCreateDateDetails();

  const handleSubmit = (e) => {
    e.preventDefault()
    const contentHtml = document.getElementById("content").innerHTML;
    setContent(contentHtml);
    console.log(contentHtml)
    if (title || content) {
      const newnote = { ...note, title, content, date }

      const newNotes = notes.map(item => {
        if (item.id.toString() === id.toString()) { 
          return newnote;
        }
        return item;
      });

      setNotes(newNotes);
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
      <Footer showdelete={showdelete} setShowDelete={setShowDelete} notes = {notes} id = {id} setNotes = {setNotes}/>

    </>

  )
}

export default EditNotes