import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/base/App';
import registerServiceWorker from './registerServiceWorker';
import './assets/css/pcss/main.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './storage'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
document.getElementById('root'));
registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
