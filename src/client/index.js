import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/base/App';
import registerServiceWorker from './registerServiceWorker';
import './assets/css/pcss/main.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
