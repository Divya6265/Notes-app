import React from 'react'
import { Link } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import db from "../firebase_config"
import { deleteDoc, collection, doc, query, getDocs, where } from "firebase/firestore";
function Folderitem({ folder, getFolders }) {
    const date = folder.date.split(" ");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const folderdbRef = collection(db, "folders");
        const filesdbRef = collection(db, "files");

        // folder doc 
        const folderRef = doc(folderdbRef, folder.id)
        console.log(folderRef,"folderref")

        // select all files with the same folder id

        const filesquery = query(filesdbRef, where("folderID", "==", folder.id));
        console.log(filesquery,"filesquery")

        const filesnapshot = await getDocs(filesquery);
        console.log(filesnapshot,"filesquery")

        // delete the files
       filesnapshot.docs.map( async (file) => await  deleteDoc(doc(filesdbRef, file.id)));

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