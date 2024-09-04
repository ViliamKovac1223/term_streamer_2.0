import React from 'react'
import '../../style/FileViewer.scss'
import { FcFolder } from "react-icons/fc";

/**
 * @param {Object} props
 * @param {string} props.folderName
 * @returns {JSX.Element} The rendered component.
 */
function FolderView({ folderName }) {
    return (
        <div className='folder'>
            <FcFolder />
            <p>{folderName}</p>
        </div>
    )
}

export default FolderView
