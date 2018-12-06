import React, { Component } from 'react';
// import logo from './logo.svg';
import Calendar from './components/Calendar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="logo">
            <span className="icon">date_range</span>
            <span>
              react <b>calendar</b>
            </span>
          </div>
        </header>
        <main>
          <Calendar key="1" />
        </main>
      </div>
    );
  }
}

export default App;
