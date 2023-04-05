import './App.css';
import ParticlesBackground from './components/particlesbg/particlesbg';
import FaceRecognition from './components/face-recognition/facerecognition';
import ImageLinkForm from './components/image-link-form/imagelinkform';
import Logo from './components/logo/logo';
import Navigation from './components/navigation/navigation';
import Signin from './components/signin/signin';
import Register from './components/register/register';
import Rank from './components/rank-file/rank';
import { Component } from 'react';


const initialState = {
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
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
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
    fetch("https://human-detector-api-production.up.railway.app/imageurl", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://human-detector-api-production.up.railway.app/image', {
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
            .catch(console.log)
        }
        this.showFaceBox(this.calcFaceLoc(response))
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
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
