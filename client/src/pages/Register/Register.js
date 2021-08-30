import React,{ useRef } from 'react';
import './Register.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router';

function Register() {

    const name = useRef();
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(name.current.value)
        if(password.current.value !== passwordAgain.current.value){
            passwordAgain.current.setCustomValidity("Passwords do not match");
        } else {
            const user = {
                name: name.current.value,
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try{
                await axios.post('auth/register', user);
                history.push('/login');
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className="registerContainer">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h2 className="registerTittle">PopDesigns</h2>
                    <p className="registerDescription">Connect with your friends and the world around you on PopDesigns.</p>
                </div>
                <form className="registerRight" onSubmit={handleClick}>
                    <h3 className="createAccountTittle">Create a New Account!</h3>
                    <input placeholder="Name" className="registerRightInput" ref={name}/>
                    <input placeholder="Username" className="registerRightInput" ref={username}/>
                    <input placeholder="Email" className="registerRightInput" ref={email}/>
                    <input type="password" placeholder="Password" className="registerRightInput" ref={password}/>
                    <input type="password" placeholder="Password Again" className="registerRightInput" ref={passwordAgain}/>
                    <button className="registerButton">Sign Up</button>
                    <Link to="/login" className="registerRegisterButton">
                        <button type="submit" className="registerRegisterButton">Log into Account</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Register