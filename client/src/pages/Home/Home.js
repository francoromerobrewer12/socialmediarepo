import React from 'react'
import './Home.scss';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

function Home() {
    return (
        <div className="homeContainer-total">
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </div>
    )
}

export default Home
