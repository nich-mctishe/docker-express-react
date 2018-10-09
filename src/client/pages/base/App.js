import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Main from '../Main'
import Other from '../Other'
import Error404 from '../errors/404'

class App extends Component {
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
      <main>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route exact path='/other' component={Other}/>
          <Route component={Error404} />
        </Switch>
      </main>
    );
  }
}

export default App;
