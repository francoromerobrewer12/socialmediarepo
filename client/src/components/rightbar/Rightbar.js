import React, {useState, useEffect, useContext} from 'react';
import './Rightbar.scss';
import { ImGift } from 'react-icons/im';
import {Users} from '../../data';
import OnlineFriend from '../onlineFriend/OnlineFriend';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { IoMdAdd } from 'react-icons/io';


function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const {user:currentUser, dispatch} = useContext(AuthContext);
    const [isFollowed, setIsFollowed] = useState(false);
 
    //Obtengo la lista de seguidos por parte del usuario pasado por prop
    useEffect(() => {
        const getFriends = async () => {
            try{
                const friendList = await axios.get('/users/friends/' + user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err)
            }
        } 
        getFriends()
    },[user._id])  
   
    const HomeRighbar = () => {
        return(
            <div className="homeRightbarContainer">

                <div className="birthdayContainer">
                    <ImGift className="birthdayImg"/>
                    <p className="birthdayText"><b>Fede Blanzari</b> and <b>3 other friends</b> are celebrating their birthday.</p>
                </div>

                <img src={`${PF}add2.jpg`} alt="" className="addImg"/>
                <img src={`${PF}add1.jpg`} alt="" className="addImg"/>

                <h2 className="onlineFriendsTittle">Online Friends</h2>
                <ul className="onlineFriendsList">
                {
                    Users.map((u) => {
                        return(
                            <OnlineFriend key={u.id} user={u} />
                        )
                    })
                }
                </ul>
            </div>
        )
    }

    const ProfileRightbar = () => {


        useEffect(() => {
            currentUser.followings.includes(user._id) ? setIsFollowed(true) : setIsFollowed(false)
        },[])
        
        

        const handleClick = async () => {
            try{
                if(isFollowed){
                    await axios.put(`/users/${user._id}/unfollow`, {userId: currentUser._id})
                    setIsFollowed(!isFollowed);
                    dispatch({type: 'UNFOLLOW', payload: user._id})
                } else {
                    await axios.put(`/users/${user._id}/follow`, {userId: currentUser._id})
                    setIsFollowed(!isFollowed);
                    dispatch({type: 'FOLLOW', payload: user._id})
                }
            } catch (err) {
                console.log(err);
            }
            
        }


        return(
            <div className="profileRightbarContainer">
                { user.username !== currentUser.username && (
                    <button className="followBtn" onClick={handleClick}>
                        {isFollowed ? "Unfollow" : "Follow"}
                        {isFollowed ? <IoMdAdd className="followIcon" /> : <IoMdAdd className="followIcon"/>  }
                    </button>
                )}
                <h2 className="userInfoTittle">User Information</h2>
                <div className="userInfoContainer">
                    <div className="userInfoOption">
                        <span className="InfoOptionKey">City:</span>
                        <span className="InfoOptionValue">{user.city}</span>
                    </div>
                    <div className="userInfoOption">
                        <span className="InfoOptionKey">From:</span>
                        <span className="InfoOptionValue">{user.from}</span>
                    </div>
                    <div className="userInfoOption">
                        <span className="InfoOptionKey">Relationship:</span>
                        <span className="InfoOptionValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Couple" : "Married" }</span>
                    </div>
                </div>
                <h2 className="userFriendsTittle">User Friends</h2>
                <div className="profileFriendsList">
                {

                    /*
                    friends.map((friend) => {
                        return(
                            <Link key={friend._id} to={'/profile/'+ friend.username}>
                                <div className="userProfileFriend">
                                    <img src={friend.profilePicture ? PF+friend.profilePicture : PF+'person/noavatar.jpeg' } alt="" className="profileFriendImg"/>
                                    <span className="profileFriendName">{friend.username}</span>
                                </div>
                            </Link>
                        )
                    })
                    */
                }
                </div>
            </div>
        )
    }


    return (
        <div className="rightbarContainer">
            {
                user ? <ProfileRightbar /> : <HomeRighbar />
            }
        </div>
    )
}

export default Rightbar
