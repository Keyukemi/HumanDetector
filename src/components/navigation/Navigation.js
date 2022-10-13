import "./navigation.css";

const Navigation = ({onRouteChange, isSignedIn}) =>{
    if (isSignedIn){
        return (
            <nav className="navbar">
                <button onClick={() => onRouteChange('signout')} className="soBtn">SIGN OUT</button>
            </nav>
        );
    }else{
        return (
            <nav className="navbar">
                <button onClick={() => onRouteChange('Signin')} className="soBtn">SIGN IN</button>
                <button onClick={() => onRouteChange('Register')} className="soBtn">REGISTER</button>
            </nav>
        );
    }
   
}

export default Navigation;