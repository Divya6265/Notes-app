import React from 'react'
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import db from "../firebase_config"
import { deleteDoc, collection, doc } from "firebase/firestore";
function Folderitem({ folder, getFolders, setIsFormVisible }) {
    const date = folder.date.split(" ");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const folderdbRef = collection(db, "folders");
        const folderRef = doc(folderdbRef, folder.id)
        await deleteDoc(folderRef)
        getFolders();
    }
   

    return (
        <>

            <Link className='folder__item' to={`/notes/${folder.id}`}>
                <div className="folder__content">
                    <div className="content">
                        <h3 className='folder__title'>{folder.title}</h3>
                        <p className='folder__date'>{date[1] + " " + date[2]} </p>
                    </div>
                    {/* <div className="actions"> */}
                        {/* <div className="edit_icon"  onClick={(e)=>{handleChange(e)}} >
                            <MdEdit className='edit_icon' />
                        </div> */}
                        <div className="delete__icon">
                            <RiDeleteBinLine className='delete__icon' onClick={handleSubmit} />
                        </div>
                    {/* </div> */}
                </div>
            </Link>

        </>
    )
}

export default Folderitem