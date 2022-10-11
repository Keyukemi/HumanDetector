import "./signin.css";

const Signin = () => {
    return (
        <form action="" className="formBox">
            <fieldset className="fieldBox">
                <legend>Sign In</legend>
                <div className="usernameBox">
                    <label htmlFor="">Email</label>
                    <input type="email" className="inputEmail"  placeholder="address@email.com"/>
                </div>
                <div className="passwordBox">
                    <label htmlFor="">Password</label>
                    <input type="password" placeholder="enter password"/>
                </div>
            </fieldset>
            <div className="submitBox">
                <input type="submit" name="" id="" />
            </div>
            <div className="regBox">
                <button> <a href="https://github.com/Keyukemi">Register</a> </button>
                <button><a href="https://github.com/Keyukemi">Forgot Password</a></button>
            </div>
        </form>

    )
}

export default Signin;


