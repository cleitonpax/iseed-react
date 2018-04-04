import React, { Component } from 'react';

class HistoryGet extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      data: {},
      isLoading: false,
      error: null,
      url: 'https://api.thingspeak.com/channels/418642/feeds.json?api_key=JHAQ9SYJPAD9W071&results=10'
    }
  }

  getHistory() {
    fetch( this.state.url )
      .then(response => {
        if (response.ok) { 
          return response.json(); 
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        this.setState({ data, isLoading: false });
      })
      .catch(error => { 
        this.setState({ error, isLoading: false });
        console.log( error );
      });
  }
  

  render() {
    return (
      <div>{ this.state.data }</div>
    )
  }
}
