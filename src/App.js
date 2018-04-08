import React, { Component } from 'react';
import './App.css';
import History from './components/history';
import { Provider } from 'react-redux';
import store from './store/store';

/* eslint-disable react/no-multi-comp */

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <History/>
      </Provider>
    )
  }
}

export default App;