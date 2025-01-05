import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Notes from './Pages/Notes'
import CreateNotes from './Pages/CreateNotes'
import EditNotes from './Pages/EditNotes'
import SearchNotes from './Pages/SearchNotes'
import db from "./firebase_config"
import { getDocs, collection } from 'firebase/firestore'

const App = () => {
  // const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [notes, setNotes] = useState([]);

  const [showdelete, setShowDelete] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem('notes',JSON.stringify(notes))
  // }, [notes]);

  const getNotes = async () => {
    const notesRef = collection(db, "files");
    const querySanpshot = await getDocs(notesRef);
    const filteredData = querySanpshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    setNotes(filteredData);
  }
  useEffect(() => {
    getNotes();
  },[]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
           <Route  path='/' element={<Notes notes={notes}/>} />
           <Route  path='/create-note' element={<CreateNotes getNotes = {getNotes} showdelete ={showdelete} setShowDelete={setShowDelete} /> } />
           <Route  path='/edit-note/:id' element={<EditNotes getNotes={getNotes} showdelete ={showdelete} setShowDelete={setShowDelete} />} />
           <Route  path='/search-note' element={<SearchNotes notes= {notes} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App