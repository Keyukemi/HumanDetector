//import React, {useState} from "react";
import "./signin.css";

const Signin = ({onRouteChange}) => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    return (
        <div className="formBox">
            <div action="" className="loginForm">
                <h2>Sign In</h2>
                <div className="credentialBox">
                    <label htmlFor="email" className="label">Email</label>
                    <input  type="email" className="inputEmail"  placeholder="address@email.com"/>
                    <label htmlFor="password" className="label">Password</label>
                    <input type="password" placeholder="*********"/>
                </div>
                <div className="submitBox">
                    <button onClick={() => onRouteChange('home')} type="submit" >Log In</button>
                </div>
                <div className="regBox">
                    <button type="submit" onClick={() => onRouteChange('Register')} className="linkBtn">Don't have an account? Register here</button>
                    <button type="submit" className="fgPass"><a href="https://github.com/Keyukemi">Forgot Password</a></button>
                </div>
            </div>
        </div>
    )
}

export default Signin;


