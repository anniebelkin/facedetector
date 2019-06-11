import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import './App.css';

const particlesOptions = {
    particles: {
        number: {
            value: 160,
            density: {
                enable: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                speed: 4,
                size_min: 0.3
            }
        },
        line_linked: {
            enable: false
        },
        move: {
            random: true,
            speed: 1,
            direction: "top",
            out_mode: "out"
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: "bubble"
            },
            onclick: {
                enable: true,
                mode: "repulse"
            }
        },
        modes: {
            bubble: {
                distance: 250,
                duration: 2,
                size: 0,
                opacity: 0
            },
            repulse: {
                distance: 400,
                duration: 4
            }
        }
    }
}

const initialState = {
    input: '',
    imageUrl: '',
    box: [],
    route: 'signin',
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }
    
    loadUser = (data) => {
        this.setState({user: {
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        entries: data.entries,
                        joined: data.joined
                      }})
    }
    
    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        const faces = clarifaiFace.map((face) => {
            return {
                leftCol: face.region_info.bounding_box.left_col * width,
                topRow: face.region_info.bounding_box.top_row * height,
                rightCol: width - (face.region_info.bounding_box.right_col * width),
                bottomRow: height - (face.region_info.bounding_box.bottom_row * height)
            }
        })
        return faces;
    }
    
    displayFaceBox = (box) => {
        this.setState({box:box});
    }
    
    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }
    
    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        fetch('https://protected-plateau-20722.herokuapp.com/imageurl', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    input: this.state.input
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('https://protected-plateau-20722.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                    .then(response => response.json())
                    .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count}));
                        })
                    .catch(err => console.log(err));
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
        })
            .catch(err => console.log(err))
    }
    
    onRouteChange = (page) => {
        if (page !== 'home'){
            this.setState(initialState);
        }
        this.setState({route: page});
    }
    
    render() {
      return (
        <div className="App">
              <Particles className='particles'
              params={particlesOptions}
                />
              <Logo />
                {(() => {   
                    switch(this.state.route) {
                    case ('signin') : 
                            return <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
                    case ('register') :
                            return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
                    case ('home') :
                            return (<div>
                                    <nav >
                                        <Rank user={this.state.user} />
                                        <Navigation  onRouteChange={this.onRouteChange} />
                                    </nav>
                                    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                                    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
                            </div>);
                    default:
                            return <p>error 404</p>;
                    }
                })()}
        </div>
      );
    }
}

export default App;
