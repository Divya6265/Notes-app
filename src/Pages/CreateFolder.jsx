import React, { useState } from 'react'
import { BsPlusLg } from "react-icons/bs";
import Folder from "../components/Folderitem"
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom"
import { addDoc, collection } from 'firebase/firestore';
import { useCreateDateDetails } from '../components/useCreateDate';
import db from "../firebase_config"

function CreateFolder({ folders, getFolders }) {
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const folderRef = collection(db, "folders");
        await addDoc(folderRef, {
            title: title,
            date: useCreateDateDetails()
        })
        handleBox();
        getFolders();
    }
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
                {folders.map((folder) => <Folder key={folder.id} folder={folder}  getFolders={getFolders} />)}
            </div>
       
                <div className="folder__form">
                    {
                        isFormVisible ? (
                            <div className="form__wrapper">
                                <form className='box__content  ' >
                                    <h3>New Folder</h3>
                                    <input type="text" name="foldername" id="foldername" autoComplete='off' autoFocus onChange={(e) => { setTitle(e.target.value) }} />
                                    <div className="controlls">
                                        < input type="button" id='cancel__box' className='cancel__box form__btn' onClick={handleBox} value="Cancel" />
                                        <input type="submit" onClick={handleSubmit} className='form__btn' value="OK" />
                                    </div>
                                </form>
                            </div>
                        ) : null
                    }
                </div>
    
            <button className='btn open__box' onClick={handleBox} style={{ backgroundColor: 'rgba(52,52,52,255)' }}><BsPlusLg className='add_btn' /></button>
        </>
    )
}

export default CreateFolder