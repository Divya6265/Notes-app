import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { Link, useParams } from 'react-router-dom';
import { BsPlusLg } from "react-icons/bs";
import NoteItem from '../components/NoteItem';
import { collection, getDocs, doc, query, where } from 'firebase/firestore';
import db from "../firebase_config";

function Notes({ notes, getFolders }) {
    const [showSearch, setShowSearch] = useState(false);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const {id} = useParams();
    
    const folderDocRef = doc(db, "folders", id);
    const getData = async () => {


        console.log(folderDocRef, "foldocref")

        const q = query(
            collection(db, "files"),
            where("folder", "==", folderDocRef)
        );
        
        const querySanpshot = await getDocs(q)

        console.log(querySanpshot, "querySanpshot")

        const data = querySanpshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
        setFilteredNotes(data);
    }
    useEffect(() => {
        getFolders();
        getData();
    }, [id]);

    return (
        <>
            <section>
                <header className="notes__header">
                    <h1>Notes</h1>
                    <button className='btn'><Link to={`/search-note`}>  <CiSearch className='searchicon' /> </Link></button>
                </header>
                <div className="notes__container">
                    {(filteredNotes.length > 0) ? (
                        filteredNotes.map(note => (
                            <NoteItem key={note.id} note={note} />
                        ))
                    ) : (
                        <p>No notes created yet</p>
                    )}
                </div>
                <Link to={`/create-note/${id}`} style={{ backgroundColor: 'rgba(52,52,52,255)' }} > <BsPlusLg className='add_btn' /> </Link>
            </section>
        </>
    )
}

export default Notes