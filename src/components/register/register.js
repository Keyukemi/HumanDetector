import React from "react";
import "./register.css";

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            registerName:"",
            registerEmail: "",
            registerPassword: ""
        }
    }
    onNameChange =(event)=>{
        this.setState({registerName: event.target.value})
    }
    onEmailChange =(event)=>{
        this.setState({registerEmail: event.target.value})
    }
    onPasswordChange =(event)=>{
        this.setState({registerPassword: event.target.value})
    }

    onSubmitRegister =() =>{
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })

        })
        .then(response => response.json())
        .then(user => {
            if (user){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        }) 
    }
    
    render(){
        const {onRouteChange} = this.props;
        return (
            <div className="formBox">
            <div action="" className="loginForm">
                <h2>Register</h2>
                <div className="credentialBox">
                    <label htmlFor="name" className="label">Full Name</label>
                    <input onChange={this.onNameChange}  type="name" placeholder="Your full name"/>
                    <label htmlFor="email" className="label">Email</label>
                    <input onChange={this.onEmailChange}   type="email" className="inputEmail"  placeholder="address@email.com"/>
                    <label htmlFor="password" className="label">Password</label>
                    <input onChange={this.onPasswordChange}  type="password" placeholder="*********"/>
                </div>
                <div className="submitBox">
                    <button type="submit" onClick={this.onSubmitRegister} >Register</button>
                </div>
                    <button type="submit" onClick={() => onRouteChange('Signin')} className="linkBtn"> Have an account? Login here</button>
            </div>
        </div>
        )
    } 
}

export default Register;


