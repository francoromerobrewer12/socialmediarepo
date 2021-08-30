import React, {useState, useEffect} from 'react';
import './Profile.scss';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import axios from 'axios';
import { useParams } from 'react-router';

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});

    //hook q me devuelve un objeto con los params de la url
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
            console.log(res.data)
        } 
        fetchUser()
    },[username])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="rightProfile">
                    <div className="rightProfileTop">
                        <div className="userImages">
                            <img src={user.coverPicture ? PF + user.coverPicture : PF+ "cover/nocover2.jpg"} alt="" className="coverImg"/>
                            <img src={user.profilePicture ? PF + user.profilePicture : PF+ "person/noavatar.jpeg"}  alt="" className="userProfilePicture"/>
                        </div>
                        <div className="profileUserInfo">
                            <span className="profileUserInfoName">{user.name}</span>
                            <span className="profileUserInfoDescription">{user.desc}</span>
                        </div>
                    </div>
                    <div className="rightProfileBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile

