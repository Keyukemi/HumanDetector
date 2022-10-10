import './facerecognition.css';

const FaceRecognition = ({ imageUrl, box}) => {
    return (
        <div className="fatherBox">
            <div className='imageBox'>
                <img  id='inputedImage' src={imageUrl} alt="" className='thepic' />
                <div className='bounding-box' style={{right:box.rightCol, left:box.leftCol, top:box.topRow, bottom:box.bottomRow}} ></div>
            </div>
        </div>
    );
}

export default FaceRecognition;



