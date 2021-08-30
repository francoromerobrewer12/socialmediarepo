import React, { useRef, useContext } from 'react';
import './Login.scss';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom';


function Login() {

    const email = useRef();
    const password = useRef();
    const {user, isFetching, dispatch} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value } , dispatch );
    }
    
    console.log(user);
    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h2 className="loginTittle">PopDesigns</h2>
                    <p className="loginDescription">Connect with your friends and the world around you on PopDesigns.</p>
                </div>
                <form className="loginRight" onSubmit={handleSubmit}>
                    <h3 className="loginAccountTittle">Log In into your Account!</h3>
                    <input placeholder="Email" type="email" required className="loginRightInput" ref={email} />
                    <input placeholder="Password" type="password" required className="loginRightInput" ref={password}/>
                    <button className="loginButton" disabled={isFetching}> { isFetching ? <CircularProgress color="inherit" size="25px"/> : 'Log In'}</button>
                    <span className="loginForgot">Forgot password?</span>
                    <Link to="/register" className="loginRegisterButton">
                        <button className="loginRegisterButton">Create a New Account</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login
