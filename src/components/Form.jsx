import React,{useState} from 'react'

import db from "../firebase_config"
import { addDoc, collection } from "firebase/firestore";
import { useCreateDateDetails } from './useCreateDate';

function Form({isFormVisible, handleBox, getFolders}) {
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
  return (
    <>
       
       <div className="folder__form">
                    {
                        isFormVisible ? (
                            <div className="form__wrapper">
                                <form className='box__content  ' >
                                    <h3>New Folder</h3>
                                    <input type="text" name="foldername"  id="foldername" autoComplete='off' autoFocus onChange={(e) => { setTitle(e.target.value) }} />
                                    <div className="controlls">
                                        < input type="button" id='cancel__box' className='cancel__box form__btn' onClick={handleBox} value="Cancel" />
                                        <input type="submit" onClick={handleSubmit} className='form__btn' value="OK" />
                                    </div>
                                </form>
                            </div>
                        ) : null
                    }
                </div>
    
    </>
  )
}

export default Form