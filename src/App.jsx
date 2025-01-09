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
  const [folders, setfolders] = useState([]);
  
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
  const getFolders = async( ) => {
    const folderRef = collection(db, "folders");
    const querySanpshot = await getDocs(folderRef)
    const filteredData = querySanpshot.docs.map((doc) => ({
      id:doc.id,
      ...doc.data()
    }));
    console.log(filteredData, "folder data .....");
    setfolders(filteredData);
  }

  useEffect(() => {
    getNotes();
  },[]);
  useEffect(()=>{
    getFolders();
  },[])
  return (
    <div>
      <BrowserRouter>
        <Routes>
           <Route  path='/' element={<CreateFolder folders={folders} getFolders={getFolders} />} />
           <Route  path='/notes/:id' element={<Notes notes={notes} getFolders={getFolders}/>} />
           <Route  path='/create-note/:id' element={<CreateNotes getNotes = {getNotes} showdelete ={showdelete} setShowDelete={setShowDelete} /> } />
           <Route  path='/edit-note/:id' element={<EditNotes getNotes={getNotes} showdelete ={showdelete} setShowDelete={setShowDelete} />} />
           <Route  path='/search-note' element={<SearchNotes notes= {notes} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App