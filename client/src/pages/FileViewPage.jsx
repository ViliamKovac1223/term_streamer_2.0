import { useState, useEffect } from 'react'
import FileViewer from '../components/FileViewer'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PATH_PARAM } from '../constants.js'

const DIRECTORY_DETAILS_API = "/FilesDetails/DirectoryDetails"

function FileViewPage() {
    const navigate = useNavigate();

    /**
     * @type {import('../types.js').DirectoryDetailsDTO}
     */
    const [dirData, setDirData] = useState(null);
    /**
     * Fetches data for directory render, and set stats for render
     *
     * @param {string} pathDir - Directory to fetch data from, argument for api
     */
    async function processDir(pathDir = null) {
        console.log("Directory mode")
        // Fetch directory information
        try {
            // Create url with/without optional parameter
            let url = DIRECTORY_DETAILS_API;
            if (pathDir != null)
                url += `?${PATH_PARAM}=${encodeURIComponent(pathDir)}`;

            console.log(`url: ${url}`);
            // Fetch data
            const response = await fetch(url)
            if (!response.ok)
                throw new Error("Network request failed with error: " + response.statusText);

            if (response.status == 204) {
                console.log("204 error while fetching data for directory");
                navigate('/error', { replace: true });
            }

            /**
             * @type {import('../types.js').DirectoryDetailsDTO} data - response
             */
            const data = await response.json();
            console.log(data);

            // Set states for appropriate renders
            setDirData(data);
        } catch (err) {
            console.log("Error happened during DirectoryDetails fetching:");
            console.log(err);
        }
    }

    const [searchParams, _] = useSearchParams();
    useEffect(() => {
        let pathParamValue = searchParams.get(PATH_PARAM);
        console.log("path param value:", pathParamValue);

        if (pathParamValue == undefined)
            pathParamValue = null;

        processDir(pathParamValue);
    }, [searchParams]);

    return (
        <>
            <div>FileViewPage</div>
            {(dirData) &&
                (<FileViewer
                    currDirectory={dirData.directoryPath}
                    files={dirData.files}
                    directories={dirData.directories}
                    prevDirectory={dirData.previousDirectory}
                />)}
            {(!dirData) && (<h1>Loading dir data</h1>)}
        </>
    )
}

export default FileViewPage
