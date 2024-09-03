import { useState, useEffect } from 'react'
import VideoPlayer from './components/VideoPlayer';

const FILE_DETAILS_API = "/FilesDetails"

function App() {
    // Video source
    const [source, setSource] = useState("");

    // Fetch data at the start of the app
    useEffect(() => {
        fetch(FILE_DETAILS_API)
            .then(response => {
                if (!response.ok)
                    throw new Error("Network request failed with error: " + response.statusText);

                return response.json();
            })
            .then((data) => {
                console.log('fetch data: ');
                console.log(data);
                if (data.file != null) {
                    setSource(data.file);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <VideoPlayer source={source} />
        </>
    )
}

export default App
