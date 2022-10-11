import './App.css';
import ParticlesBackground from './components/particlesbg/particlesbg';
//import Clarifai from 'clarifai';
import FaceRecognition from './components/face-recognition/facerecognition';
import ImageLinkForm from './components/image-link-form/imagelinkform';
import Logo from './components/logo/logo';
import Navigation from './components/navigation/navigation';
import Signin from './components/signin/signin';
import Rank from './components/rank-file/rank';
import { Component } from 'react';


// const app = new Clarifai.App({
//  apiKey: '6a637c2dd5fc4565a006d894e982b334'
// });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'Signin'
    }
  }

  calcFaceLoc = (data) => {
    const getFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputedImage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    //console.log(getFace);

    return {
      bottomRow: height - (getFace.bottom_row * height),
      leftCol: getFace.left_col * width,
      rightCol: width - (getFace.right_col * width),
      topRow: getFace.top_row * height
    }
  }

  showFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    //console.log('click');

    const USER_ID = 'vtszy7uwboz9';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'dbee67e7b6f0464e8c005566a64f1f1c';
    const APP_ID = 'cf0200675a43489cb1d54999f2206da5';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      //.then(result => {console.log(result.outputs[0].data.regions[0].region_info.bounding_box)})
      .then(result => this.showFaceBox(this.calcFaceLoc(result)))
      .catch(error => console.log('error', error));

  }

  // onRouteChange = () =>{
  //   this.setState(route: 'home')
  // }


  render() {
    return (
      <div className="App">
        <ParticlesBackground />
        <Navigation />
        <Logo />
        {this.state.route === 'Signin'
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <div>
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
          </div>
        }
      </div>
    );
  }
}


export default App;
