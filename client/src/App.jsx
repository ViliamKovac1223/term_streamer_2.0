import { useState, useEffect, useDebugValue } from 'react'
import VideoPlayer from './components/VideoPlayer';
import FileViewer from './components/FileViewer.jsx';

const FILE_DETAILS_API = "/FilesDetails"
const DIRECTORY_DETAILS_API = "/FilesDetails/DirectoryDetails"

function App() {
    /**
     * @returns {string} source - video source
     */
    const [source, setSource] = useState("");

    /**
     * @returns {boolean} isFileView - if true, video player for single file will be rendered if false then folder will be rendered
     */
    const [isFileView, setIsFileView] = useState(false);

    /**
     * @returns {import('./types.js').DirectoryDetailsDTO}
     */
    const [dirData, setDirrData] = useState(null);

    /**
     * @param {boolean} isFileDetailsFetched - if true the data for file view has been fetched
     */
    const [isFileDetailsFetched, setIsFileDetailsFetched] = useState(false);

    async function processDir() {
        console.log("Directory mode")
        // Fetch directory information
        try {

            const response = await fetch(DIRECTORY_DETAILS_API)
            if (!response.ok)
                throw new Error("Network request failed with error: " + response.statusText);

            /**
             * @type {import('./types.js').DirectoryDetailsDTO} data - response
             */
            const data = await response.json();
            console.log(data);

            // Set states for appropriate renders
            setDirrData(data);
            setIsFileDetailsFetched(true);
            setIsFileView(false);
        } catch (err) {
            console.log("Error happened during DirectoryDetails fetching:");
            console.log(err);
        }
    }

    async function fetchFileDetials() {
        try {
            const response = await fetch(FILE_DETAILS_API)
            if (!response.ok)
                throw new Error("Network request failed with error: " + response.statusText);

            /**
             * @type {import('./types.js').FileDetails}
             */
            const data = await response.json();
            console.log(data);

            // If server is in file mode then play the only streamed video
            if (data.file != null) {
                console.log("File mode")
                // Set video source
                setSource(data.file);

                // Set states for appropriate renders
                setIsFileDetailsFetched(true);
                setIsFileView(true);
                return;
            }

            // If server is in directory mode then process information in directory
            processDir();
        } catch (err) {
            console.log("Error happened during FilesDetails fetching:");
            console.log(err);
        }
    }

    // Fetch data at the start of the app
    useEffect(() => {
        fetchFileDetials();
    }, []);

    return (
        <>
            {(isFileDetailsFetched && isFileView) && (<VideoPlayer source={source} />)}
            {(isFileDetailsFetched && dirData && !isFileView) &&
                    (<FileViewer
                        currDirectory={dirData.directoryPath}
                        files={dirData.files}
                        directories={dirData.directories}
                        prevDirectory={dirData.previousDirectory}
                        />)}
        </>
    )
}

export default App
