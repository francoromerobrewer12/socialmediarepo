import React from 'react';
import './Sidebar.scss';
import { MdRssFeed } from 'react-icons/md';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';
import { RiVideoFill } from 'react-icons/ri';
import { TiGroup } from 'react-icons/ti';
import { IoBookmarkSharp } from 'react-icons/io5';
import { BsFillQuestionSquareFill } from 'react-icons/bs';
import { FaSuitcase } from 'react-icons/fa';
import { BsFillCalendarFill } from 'react-icons/bs';
import { MdSchool } from 'react-icons/md';
import CloseFriend from '../closeFriend/CloseFriend';
import {Users} from '../../data';


function Sidebar() {
    return (
        <div className="sidebarContainer">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <MdRssFeed className="sidebarListIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <BsFillChatSquareDotsFill className="sidebarListIcon" />
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <RiVideoFill className="sidebarListIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <TiGroup className="sidebarListIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <IoBookmarkSharp className="sidebarListIcon" />  
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <BsFillQuestionSquareFill className="sidebarListIcon" />   
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <FaSuitcase className="sidebarListIcon" />  
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <BsFillCalendarFill className="sidebarListIcon" />  
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <MdSchool className="sidebarListIcon" />  
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                    
                </ul>
                <button className="showmoreButton">Show More</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                {
                    Users.map((u) => {
                        return(
                            <CloseFriend key={u.id} user={u} />
                        )
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
