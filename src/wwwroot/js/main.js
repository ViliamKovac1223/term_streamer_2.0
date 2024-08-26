const VID_PLAYER_ID = "video-js-player"

function main() {
    // Fetch files details from server
    fetch("/FilesDetails")
        .then(response => {
            if (!response.ok)
                throw new Error("Network request failed with error: " + response.statusText);

            return response.json();
        })
        .then(processFileDetails)
        .catch(error => {
            console.error(error);
        });
}

function processFileDetails(data) {
    if (data.file != null) {
        console.log("File configuration");
        prepareVideo(data.file)

    } else if (data.directory != null) {
        console.log("Directory configuration");
    }
}

function prepareVideo(file) {
    const videoPlayer = document.getElementById(VID_PLAYER_ID);

    // Remove all previous video sources from videoPlayer
    const sources = videoPlayer.querySelectorAll('source');
    sources.forEach(source => {
        videoPlayer.removeChild(source);
    });

    // Add new video source
    const videoSourceElement = document.createElement('source');
    videoSourceElement.src = file; // Set the source path
    videoSourceElement.type = 'video/mp4'; // Set the type
    videoPlayer.appendChild(videoSourceElement);
}

function prepareDirectory(files) {
}

main();
