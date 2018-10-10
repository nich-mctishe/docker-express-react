
import React, { Component } from 'react';

import logo from '../assets/img/logo.svg';

class Else extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">React else page</h1>
        </header>
        <p className="App-intro">
          <span>{this.state.response}</span>
        <br />
          <span className='status'>this is working</span>
        </p>
      </div>
    );
  }
}

export default Else;
