import React from 'react'
import '../../style/FileViewer.scss'
import { FcCamcorderPro } from "react-icons/fc";

/**
 * @param {Object} props
 * @param {string} props.fileName
 * @returns {JSX.Element} The rendered component.
 */
function FileView({ fileName }) {
    return (
        <div className='file'>
            <FcCamcorderPro />
            <p>{fileName}</p>
        </div>
    )
}

export default FileView
