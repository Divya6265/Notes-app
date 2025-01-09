import React from 'react'
import { Link } from 'react-router-dom'

function NoteItem({note}) {
  const date = note.date.split(" ");
  const text = note.content.replace(/<.*?>/g, '').replace(/&nbsp;/g, ' ');

  return (
    <div className="note">
      <Link to={`/edit-note/${note.id}`} style= {{ backgroundColor: 'rgba(52,52,52,255)'}} className="note__item">
       <h1 className='note__title'> { note.title.length > 40 ? (note.title.substr(0,40)) + '...' : note.title} </h1>
       <p className='note__content'>{text} </p>
       <p className='note__date'>{date[1] + " " + date[2]}</p>
       
      </Link>
    </div>
  )
}

export default NoteItem