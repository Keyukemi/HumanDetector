import './App.css';
import ParticlesBackground
 from './components/particlesbg/particlesbg';
// import FaceRecognition from './components/face-recognition/facerecognition';
import ImageLinkForm from './components/image-link-form/imagelinkform';
import Logo from './components/logo/logo';
import Navigation from './components/navigation/navigation';
import Rank from './components/rank-file/rank';

function App() {
  return (
    <div className="App">
      <ParticlesBackground />
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm />
      
      {/* 
      <FaceRecognition />} */}
    </div>
  );
}

export default App;
