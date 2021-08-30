import React, {useState, useEffect, useContext} from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './Feed.scss';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function Feed({username}) {
    const [posts, setPosts] = useState([]);
    const {user} = useContext(AuthContext)    

    //Request a la base de datos 
    useEffect(() => {
        const fetchFeedPosts = async () => {
            let res = null;
            if(username){
                res = await axios.get("/posts/profile/" + username);
            } else {
                res = await axios.get("/posts/timeline/" + user._id);
            }
            setPosts(res.data.sort((post1,post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt)
            }));
        }
        fetchFeedPosts()
    },[username, user._id]);
    
    return (
        <div className="feedContainer">
            { (username === user.username || username === undefined)  && <Share /> }
            {  
            
               posts.map((p) => {
                   return <Post key={p._id} post={p} />
               })
            
            }
        </div>
    )
}

export default Feed
