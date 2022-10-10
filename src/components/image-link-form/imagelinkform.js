import './imagelinkform.css';
import Scanicon from './scan.png'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div className='thebox'>
            <p className="boxtitle"> {'I detect Faces in pictures, Try Me!'} </p>
            <div className='inputbox'>
                <input className="inputurl" type="text" placeholder='Add a link to the picture' onChange={onInputChange}/>
                <button className="detectbutton" type='submit' onClick={onButtonSubmit}>
                    <img src={Scanicon} alt="" className='scanicon' />
                </button>
            </div>
        </div>
    );
};

export default ImageLinkForm;
