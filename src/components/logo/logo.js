import './logo.css';
import 'animate.css';

import Brain from './brain.jpeg';
// import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return (

            <div className='logoimg animate__animated animate__flipInX animate__repeat-3'>
                <img src={Brain} alt="brain icon" className='brainicon' />
            </div>           

    );
};

export default Logo;