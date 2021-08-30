import React, { useContext } from 'react';
import './Topbar.scss';
import { AiOutlineSearch, AiTwotoneMessage } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoMdNotifications } from 'react-icons/io';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user, dispatch} = useContext(AuthContext);

    const logoutUser = () => {
        dispatch({ type: 'LOGOUT_USER' });
    }

    return (
        <div className="topbarContainer">
            <div className="leftTopbar">
                <Link to="/">
                    <h1 className="logo">PopDesigns</h1>
                </Link>
            </div>
            <div className="centerTopbar">
                <div className="searchContainer">
                    <input placeholder="Search for a friend, post or video" className="searchInput"/>
                    <AiOutlineSearch className="searchIcon"/>
                </div>
            </div>
            <div className="rightTopbar">
                <div className="topbarLinks">
                    <span className="topbarLink" onClick={logoutUser}>Logout</span>
                </div>

                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <BsFillPersonFill className="topbarIcon" size="20px"/>
                        <div className="notificacion">{user.solicitudesAmistad}</div>
                    </div>
                    <div className="topbarIconItem">
                        <AiTwotoneMessage className="topbarIcon" size="20px"/>
                        <div className="notificacion">{user.mensajesPorLeer}</div>
                    </div>
                    <div className="topbarIconItem">
                        <IoMdNotifications className="topbarIcon" size="20px"/>
                        <div className="notificacion">{user.notificaciones}</div>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF+"person/noavatar.jpeg"} alt="" className="topbarImg"/>
                </Link>
            </div>
        </div>
    )
}

export default Topbar
