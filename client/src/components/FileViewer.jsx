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

    console.log("dirs: ", directories);

    // Sort files and directories by alphabet
    if (files != null)
        files.sort();
    if (directories != null)
        directories.sort();

    if (files != null)
        files.forEach((file) => {
            let {last} = trimToLastFolder(file);
            trimedFilePaths.push(last);
        });

    if (directories != null)
        directories.forEach((dir) => {
            let {last} = trimToLastFolder(dir);
            dirs.push(last);
        });

    return (
        <div>
            <h1>{currDirectory}</h1>
            {prevDirectory && <FolderView folderName='..' prevDirectory={prevDirectory}/>}

            {/*Render all directories*/}
            {directories && dirs.map((dir, index) => (
                <FolderView key={index} folderName={dir} folderPath={directories.at(index)} />
            ))}

            {/*Render all files*/}
            {files && trimedFilePaths.map((file, index) => (
                <FileView key={index} fileName={file} currDirectory={currDirectory} />
            ))}
        </div>
    )
}

export default FileViewer
