import React from 'react';
import './OnlineFriend.scss';

function OnlineFriend({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="onlineFriendsListItem">
            <div className="onlineFriendImgWrap">
                <img src={PF+user.profilePicture} alt="" className="onlineFriendImg"/>
                <span className="onlineCircle"></span>
            </div>
            <span className="onlineFriendName">{user.username}</span>
        </li>
    )
}

export default OnlineFriend
