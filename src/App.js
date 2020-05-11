import React from 'react';
import Axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/headers/Header.js';
import Home from './components/home-components/Home.js';
import Channel from './components/channels/Channel.js';
import './App.css';
import Footer from './components/footers/Footer.js';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      videos: [],
      isLoading: true
    }
  }
  render(){
    return (
      <BrowserRouter>
          <div className="main-panel">
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/channel" component={Channel} />
            <Footer />
          </div>
      </BrowserRouter>
        );
  }
}

export default App;