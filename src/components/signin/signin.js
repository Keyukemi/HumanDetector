import React from "react";
// import { json } from "react-router-dom";
import "./signin.css";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: ""
        }
    }
    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('https://human-detector-api-production.up.railway.app/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })

        })

            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }
    render() {
        const { onRouteChange } = this.props;
        return (
            <div className="formBox">
                <div action="" className="loginForm">
                    <h2>Sign In</h2>
                    <div className="credentialBox">
                        <label htmlFor="email" className="label">Email</label>
                        <input onChange={this.onEmailChange} type="email" className="inputEmail" placeholder="address@email.com" />
                        <label htmlFor="password" className="label">Password</label>
                        <input onChange={this.onPasswordChange} type="password" placeholder="*********" />
                    </div>
                    <div className="submitBox">
                        <button onClick={this.onSubmitSignIn} type="submit" >Log In</button>
                    </div>
                    <div className="regBox">
                        <button type="submit" onClick={() => onRouteChange('Register')} className="linkBtn">Don't have an account? Register here</button>
                        <button type="submit" className="fgPass"><a href="https://github.com/Keyukemi">Forgot Password</a></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin;


