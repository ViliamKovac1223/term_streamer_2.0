import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className='header'>
            <Link className='header-title link' to='/'>Term-streamer_2.0</Link>
        </div>
    )
}

export default Header
