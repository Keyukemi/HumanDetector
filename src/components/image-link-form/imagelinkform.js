import './imagelinkform.css';
import Scanicon from './scan.png'

const ImageLinkForm = () => {
    return (
        <div className='thebox'>
            <p className="boxtitle"> {'I detect Faces in pictures, Try Me!'} </p>
            <div className='inputbox'>
                <input className="inputurl" type="text" placeholder='Add a link to the picture' />
                <button className="detectbutton" type='submit'><img src={Scanicon} alt="" className='scanicon' /></button>
            </div>
        </div>
    );
};

export default ImageLinkForm;