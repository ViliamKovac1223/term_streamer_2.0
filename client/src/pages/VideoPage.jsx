import React from 'react'
import VideoPlayer from '../components/VideoPlayer'

function VideoPage({ source }) {
    return (
        <>
            <div>VideoPage</div>
            <VideoPlayer source={source} />
        </>
    )
}

export default VideoPage
