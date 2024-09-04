import React from 'react'
import FolderView from './FolderView'
import FileView from './FileView'
import { trimToLastFolder } from '../utils.js'

/**
 * @param {Object} props
 * @param {string?} props.currDirectory
 * @param {string[]?} props.files
 * @param {string[]?} props.directories
 * @param {string?} props.prevDirectory
 * @returns {JSX.Element} The rendered component.
 */
function FileViewer({ currDirectory, files, directories, prevDirectory }) {
    let dirs = [];
    let trimedFilePaths = [];

    files.forEach((file) => {
        let {last} = trimToLastFolder(file);
        trimedFilePaths.push(last);
    });

    directories.forEach((dir) => {
        let {last} = trimToLastFolder(dir);
        dirs.push(last);
    });

    return (
        <div>
            <h1>{currDirectory}</h1>
            {prevDirectory && <FolderView folderName='..' />}

            {/*Render all directories*/}
            {directories && dirs.map((dir, index) => (
                <FolderView key={index} folderName={dir} />
            ))}

            {/*Render all files*/}
            {files && trimedFilePaths.map((file, index) => (
                <FileView key={index} fileName={file} />
            ))}
        </div>
    )
}

export default FileViewer
