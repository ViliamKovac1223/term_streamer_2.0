import React from 'react'
import '../../style/FileViewer.scss'
import { FcFolder } from "react-icons/fc";
import { Link } from 'react-router-dom';

/**
 * @param {Object} props
 * @param {string} props.folderName
 * @param {string?} props.folderPath
 * @param {string?} props.prevDirectory
 * @returns {JSX.Element} The rendered component.
 */
function FolderView({ folderName, folderPath, prevDirectory }) {
    let linkUrl = `/?path=${folderPath}`;
    // If folder is link to previous directory then adjust the link
    if (folderName === '..')
        linkUrl = `/?path=${prevDirectory}`

    return (
        <Link className='folder' to={linkUrl}>
            <FcFolder />
            <p>{folderName}</p>
        </Link>
    )
}

export default FolderView
