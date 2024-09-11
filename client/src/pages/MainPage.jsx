import React from 'react'
import { useState, useEffect } from 'react'
import VideoPlayer from '../components/VideoPlayer';
import FileViewPage from './FileViewPage.jsx';
import { useSearchParams } from 'react-router-dom';
import { FILE_DETAILS_API, VID_PATH_PARM } from '../constants.js'

function MainPage() {
    /**
     * @type {string} source - video source
     */
    const [source, setSource] = useState("");

    /**
     * @type {string} source - video source
     */
    const [directory, setDirectory] = useState("");

    /**
     * @type {boolean} isFileView - if true, video player for single file will be rendered
     */
    const [isFileView, setIsFileView] = useState(false);

    /**
     * @type {boolean} isDirView - if true then dir view will be rendered
     */
    const [isDirView, setIsDirView] = useState(false);

    /**
     * @type {boolean} isDirVideo - if true then video will be viewed
     */
    const [isDirVideo, setDirVideo] = useState(false);

    /**
     * @type {string} dirVideoSource - Video source selected from dir view
     */
    const [dirVideoSource, setDirVideoSource] = useState("");

    /**
     * @type {boolean} isFileDetailsFetched - if true the data for file view has been fetched
     */
    const [isFileDetailsFetched, setIsFileDetailsFetched] = useState(false);

    async function fetchFileDetials() {
        try {
            const response = await fetch(FILE_DETAILS_API)
            if (!response.ok)
                throw new Error("Network request failed with error: " + response.statusText);

            /**
             * @type {import('../types.js').FileDetails}
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

            // If server is in directory mode then show FilewViewPage

            // Set directory data
            setDirectory(data.directory);
            // Set stats for appropriate render
            setIsFileDetailsFetched(true);
            setIsDirView(true);
        } catch (err) {
            console.log("Error happened during FilesDetails fetching:");
            console.log(err);
        }
    }

    // Fetch data at the start of the app
    useEffect(() => {
        fetchFileDetials();
    }, []);

    // Check url params
    const [searchParams, _] = useSearchParams();
    useEffect(() => {
        let pathParamValue = searchParams.get(VID_PATH_PARM);

        // When there is no video to load selected from directory view,
        // then set dirVideo and dirVideoSource to its original value
        if (pathParamValue == null) {
            setDirVideo(false);
            setDirVideoSource("");
            return ;
        }

        // Set video source and set attributes to render that video
        console.log("vid param value:", pathParamValue);
        setDirVideo(true);
        setDirVideoSource(pathParamValue);
    }, [searchParams]);

    return (
        <>
            {(isFileDetailsFetched && isFileView) && (<VideoPlayer source={source} />)}
            {(isFileDetailsFetched && isDirView && !isDirVideo) && (<FileViewPage directory={directory} />)}
            {(isFileDetailsFetched && isDirVideo) && (<VideoPlayer source={dirVideoSource} />)}
            {(!isFileDetailsFetched) && (<h1>Loading</h1>)}
        </>
    )
}

export default MainPage
