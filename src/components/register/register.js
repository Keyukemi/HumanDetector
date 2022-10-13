import "./register.css";

const Register = ({onRouteChange}) => {
    return (
        <div className="formBox">
        <div action="" className="loginForm">
            <h2>Register</h2>
            <div className="credentialBox">
                <label htmlFor="name" className="label">Full Name</label>
                <input type="name" placeholder="Your full name"/>
                <label htmlFor="email" className="label">Email</label>
                <input  type="email" className="inputEmail"  placeholder="address@email.com"/>
                <label htmlFor="password" className="label">Password</label>
                <input type="password" placeholder="*********"/>
            </div>
            <div className="submitBox">
                <button type="submit" onClick={() => onRouteChange('home')} >Register</button>
            </div>
                <button type="submit" onClick={() => onRouteChange('Signin')} className="linkBtn"> Have an account? Login here</button>
        </div>
    </div>
    )
}

export default Register;


