import React from 'react'
import VideoJS from './VideoJS';
import videojs from 'video.js';
import '../../style/videoPlayer.scss'

function VideoPlayer({ source }) {
    const playerRef = React.useRef(null);

    /** @type {import('../types.js').VideoJsOptions} */
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        class: "video-js",
        fluid: false,
        sources: {
            src: source,
            type: 'video/mp4'
        }
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // Handle player events
        player.on('waiting', () => {
            videojs.log('Player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('Player will dispose');
        });
    };

    return (
        <div className='video-player-center'>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
    )
}

export default VideoPlayer
