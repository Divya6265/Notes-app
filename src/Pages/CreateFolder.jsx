import React, { useState } from 'react'
import { BsPlusLg } from "react-icons/bs";
import Folderitem from "../components/Folderitem"
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom"
import Form from '../components/Form';

function CreateFolder({ folders, getFolders }) {
    const [isFormVisible, setIsFormVisible] = useState(false)

    const [title, setTitle] = useState("");

    const handleBox = () => {
        setIsFormVisible(!isFormVisible);
    }
    return (
        <>
            <header className="notes__header">
                <h1>Notes</h1>
                <button className='btn'><Link to={`/search-note`}>  <CiSearch className='searchicon' /> </Link></button>
            </header>
            <div className="folder__container">
                {folders.map((folder) => <Folderitem key={folder.id} folder={folder}  getFolders={getFolders} setIsFormVisible ={setIsFormVisible}  />)}
            </div>
             <Form isFormVisible ={isFormVisible} handleBox ={handleBox} getFolders ={getFolders}  />
            <button className='btn open__box' onClick={handleBox} style={{ backgroundColor: 'rgba(52,52,52,255)' }}><BsPlusLg className='add_btn' /></button>
            </>
    )
}

export default CreateFolder