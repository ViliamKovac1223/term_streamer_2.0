import React from 'react'
import '../../style/FileViewer.scss'
import { FcCamcorderPro } from "react-icons/fc";
import { Link } from 'react-router-dom';

/**
 * @param {Object} props
 * @param {string} props.fileName
 * @param {string} props.currDirectory
 * @returns {JSX.Element} The rendered component.
 */
function FileView({ fileName, currDirectory }) {
    const urlLink = `/?vid=${currDirectory}${fileName}`;
    return (
        <Link className='file' to={urlLink}>
            <FcCamcorderPro />
            <p>{fileName}</p>
        </Link>
    )
}

export default FileView
