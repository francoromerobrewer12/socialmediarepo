import React, { useContext, useRef, useState } from 'react';
import './Share.scss';
import { MdPhotoCamera } from 'react-icons/md';
import { FaTag } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { HiEmojiHappy } from 'react-icons/hi';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router';


function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [ file, setFile ] = useState(null);
    const history = useHistory();
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if(file){
            const data = new FormData();
            const fileName = file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;
            try{
                await axios.post("/upload", data)
            } catch (err) {
                console.log(err);
            }
        }
        try{
            await axios.post("/posts", newPost)
            history.push("/login")
            //window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const detectarSiEstoyEnPerfil = () => {
        let usuarioIndex = window.location.href.lastIndexOf("/") + 1
        let usuario = window.location.href.slice(usuarioIndex)
        return (usuario === user.username)   
    }

    return (
        <div className="shareContainer">
            <div className="shareWrapper">
               
                <div className="shareTop">
                    {   
                        !detectarSiEstoyEnPerfil() ? 
                        (
                            <Link to={`profile/${user.username}`}>
                                <img src={user.profilePicture ?  PF + user.profilePicture : PF+"/person/noavatar.jpeg"} alt="" className="shareImg"/>
                            </Link>
                        ) : 
                            <img src={user.profilePicture ?  PF + user.profilePicture : PF+"/person/noavatar.jpeg"} alt="" className="shareImg"/>
                    }
                    <input placeholder={`What´s in your mind ${user.username}?`} className="shareInput" ref={desc}/>
                </div>

                <hr className="shareHr"/>

                <div className="shareBottom" >
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOptionItem">
                            <MdPhotoCamera className="shareOptionIcon photo"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{display: "none"}} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOptionItem">
                            <FaTag className="shareOptionIcon tag"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOptionItem">
                            <IoLocationSharp className="shareOptionIcon location"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOptionItem">
                            <HiEmojiHappy className="shareOptionIcon emoji" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" onClick={submitHandler}>Share</button>
                </div>
            </div>
        </div>
    )
}

export default Share
