import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Components/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename = "/">
      <div className="App">
        <Header/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
