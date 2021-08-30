import React, {useState, useEffect, useContext} from 'react';
import './Post.scss';
import { IoMdMore } from 'react-icons/io';
import { IoMdHeartEmpty } from 'react-icons/io';
import { GoComment } from 'react-icons/go';
import { IoMdHeart } from 'react-icons/io';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';


function Post({ post }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    //Encuentro el usuario que realizo cada post
    //const user = Users.filter( u => u.id === post.userId);

    //Dar like a un post
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const {user:currentUser} = useContext(AuthContext);

    //inicio mi variable isLiked para saber si al usuario le gusta o no cada posteo
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    //Obtengo el usuario creador de cada posteo 
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        } 
        fetchUser()
    },[post.userId])

    //Evito que se le ponga like a posteos propios y segun isLiked decido si mandar like o dislike request a la api
    const handleLike = async () => {
        try{
            if(currentUser._id === post.userId){
                console.log("You cant like your own posts")
            } else {
                if(!isLiked){
                await axios.put(`/posts/${post._id}/like`, {userId: currentUser._id});
                setLike(like + 1);
                setIsLiked(true);
                } else {
                    await axios.put(`/posts/${post._id}/dislike`, {userId: currentUser._id});
                    setLike(like - 1);
                    setIsLiked(false);
                }
            }
            
        } catch (err) {
            console.log(err)
        }
    }

    const detectarSiEstoyEnPerfil = () => {
        let usuarioIndex = window.location.href.lastIndexOf("/") + 1
        let usuario = window.location.href.slice(usuarioIndex)
        return (usuario === currentUser.username || usuario.length > 0)   
    }

    return (
        <div className="postContainer">
            <div className="postTop">
                <div className="postTopLeft">
                    {
                        !detectarSiEstoyEnPerfil() ? (
                            <Link to={`profile/${user.username}`}>
                                <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noavatar.jpeg'} alt="" className="postUserImg"/>
                            </Link>
                        ) : (
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noavatar.jpeg'} alt="" className="postUserImg"/>
                        )
                    }
                    <span className="postUserName">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <IoMdMore className="postTopIcon"/>
            </div>

            <div className="postCenter">
                {post.desc && <span className="postText">{post.desc}</span>}
                <img src={PF+post.img} alt="" className="postCenterImg"/>
            </div>

            <div className="postBottom">
                <div className="postIcons">
                    {isLiked ? <IoMdHeart className="postBottomButton" color="red" onClick={handleLike}/> : <IoMdHeartEmpty className="postBottomButton" onClick={handleLike}/>}
                    <GoComment className="postBottomButton"/>
                    <span className="likeAmount">{like} people like it!</span>
                </div>
                <span className="postCommentAmount">{post.comment} Comments</span>
            </div>
        </div>
    )
}

export default Post
