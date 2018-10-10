import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Error404 from '../errors/404'
import * as files from '../../pages'

class App extends Component {
  state = {
    response: '',
    routes: this.createRoutes()
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  componentWillUpdate () {
    let routes = this.createRoutes()
    console.log(routes);
    if (this.state.routes.length > routes.length) {
      this.setState({routes: this.createRoutes()})
    }
  }

  /**
   * Get a list of all files in the pages directory and add them to the
   * Routes
   */
  createRoutes () {
    let routes = []
    for (const file in files) {
      routes.push({
        path: file.toLowerCase() === 'index' ? '/' : '/' + file.toLowerCase(),
        component: files[file]
      })
    }

    return routes
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
          {this.state.routes.map((route, i) => (
            <Route exact path={route.path} component={route.component}  key={i} />
          ))}
          <Route component={Error404} />
        </Switch>
      </main>
    );
  }
}

export default App;
