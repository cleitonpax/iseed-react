import React, { Component } from 'react';
import Counter from './Counter';
import Header from './Header';

class App extends Component {

  constructor( props ) {
    super(props);
    this.state = {
      title: 'senseHub',
      description: 'IoT Dashboard - Arduino Mega + ESP8266 | ThingSpeak Api | ReactJs'      
    }  
  }

  getHistory = () => this.refs.counter.getHistory();
  
  render(){
    return(
      <div className="container h-100 w-100 p-4">        
        <Header header={this.state} getUpdate={this.getHistory}/>          
        <Counter ref="counter"/>        
      </div>
    )
  }  
}

export default App;