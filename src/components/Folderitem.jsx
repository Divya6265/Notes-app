import React from 'react'
import { Link } from 'react-router-dom';
function Folderitem({ folder }) {
    const date = folder.date.split(" ");
    return (
        <>

            <Link className='folder__item' to={`/notes/${folder.id}`}>
                <div className="folder__content">
                    <h3 className='folder__title'>{folder.title}</h3>
                    <p className='folder__date'>{date[1] + " " + date[2]} </p>
                </div>
            </Link>

        </>
    )
}

export default Folderitem