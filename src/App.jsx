import {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Notes from './Pages/Notes'
import CreateNotes from './Pages/CreateNotes'
import EditNotes from './Pages/EditNotes'
import SearchNotes from './Pages/SearchNotes'


 const App = () => {
  // const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [notes, setNotes] = useState([]);

  const [showdelete, setShowDelete] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem('notes',JSON.stringify(notes))
  // }, [notes]);

  const getNotes = async() => {
    
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
           <Route  path='/' element={<Notes notes={notes}/>} />
           <Route  path='/create-note' element={<CreateNotes setNotes = {setNotes} showdelete ={showdelete} setShowDelete={setShowDelete} /> } />
           <Route  path='/edit-note/:id' element={<EditNotes notes= {notes} setNotes={setNotes} showdelete={showdelete} setShowDelete={setShowDelete} />} />
           <Route  path='/search-note' element={<SearchNotes notes= {notes} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App