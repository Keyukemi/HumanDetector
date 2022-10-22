import './App.css';
import ParticlesBackground from './components/particlesbg/particlesbg';
//import Clarifai from 'clarifai';
import FaceRecognition from './components/face-recognition/facerecognition';
import ImageLinkForm from './components/image-link-form/imagelinkform';
import Logo from './components/logo/logo';
import Navigation from './components/navigation/navigation';
import Signin from './components/signin/signin';
import Register from './components/register/register';
import Rank from './components/rank-file/rank';
import { Component } from 'react';



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'Signin',
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  calcFaceLoc = (data) => {
    const getFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //console.log(getFace);
    const image = document.getElementById('inputedImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      bottomRow: height - (getFace.bottom_row * height),
      leftCol: getFace.left_col * width,
      rightCol: width - (getFace.right_col * width),
      topRow: getFace.top_row * height
    }
  }

  showFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });


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
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
        }
        this.showFaceBox(this.calcFaceLoc(response))
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }


  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <ParticlesBackground />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        <Logo />
        {route === 'home'
          ? <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            this.state.route === 'Signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )

        }
      </div>
    );
  }
}


export default App;
