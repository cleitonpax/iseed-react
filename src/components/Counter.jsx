import React, {Component} from 'react';
import History from './History';
import moment from 'moment';

class Counter extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: require('./../data/Sensors.json'),
      isLoading: false,
      error: null,
      setBackground: color => `card text-white bg-${color} mb-3`,
      url: 'https://api.thingspeak.com/channels/418642/feeds.json?api_key=JHAQ9SYJPAD9W071&results=100',
      sensors: []
    }    
    this.getHistory();
  }

  getHistory() {
    fetch(this.state.url)
      .then(response => {
        if (response.ok) { 
          return response.json(); 
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        this.setState({ isLoading: false });
        this.getSensorHistory( data );
      })
      .catch(error => { 
        this.setState({ error, isLoading: false });
        console.log( error );
      });
  }

  getSensorHistory( data ) {
    let sensors = JSON.parse(JSON.stringify( this.state.data ));
    sensors.map( (item, key) => { 
      let value = null;
      // Get the field keyname     
      Object.keys( data.channel ).map( (key, index) => {
        if ( data.channel[key] === item.key ) {
          item.channelKey = key;
        }
      });
      // Get the history's field value
      data.feeds.map( feed => {
        if ( typeof feed[ item.channelKey ] !== 'undefined' && feed[ item.channelKey ] ) {
          item.history.push( { value: feed[ item.channelKey ], created_at: feed['created_at'].substr(0,15) } );
          value = feed[ item.channelKey ];
        }
      });      
      item.history = this.groupHistory( item );
      // Get last value and unity
      if ( item.key === 'light' || item.key === 'temp' || item.key === 'gas' || item.key === 'humidity') {        
        if ( value ) item.value = value
        console.log(data.feeds );
      } else {
        // Calculate time from the last movement
        const fromNow = moment( data.feeds[0]['created_at'] ).fromNow();
        item.value = fromNow.split(' ')[0];
        item.unity = fromNow.substr( item.value.length, fromNow.length - 1 );
      }
      return true;
    });
    this.setState( { sensors } );
    // Update charts 
    sensors.map( item => this.refs[ item.key ].getChart() );
    console.log( 'counter update', this.state.sensors );   
  }
  
  groupHistory( item ) {
    const history = item.history;
    const out = {};
    let count = 0;
    history.map( i => { 
      // Increment accumulator if item exists 
      if ( out[ i.created_at ] ) {
        count += parseInt( i.value, 10 );
      } else { // Create new item if not exists
        out[ i.created_at ] = {
          label: i.created_at,
          value: 0
        };
      }
      // Explicity data takes the last value, binary logs accumulate the total entries 
      out[ i.created_at ][ 'value' ] = ( item.key === 'light' 
                                      || item.key === 'temp'  
                                      || item.key === 'gas' 
                                      || item.key === 'humidity')
        ? parseInt( i.value, 10 )
        : parseInt( count, 10 );                 
    });
    return out;
  }

  getValue( sensor ) {
    if ( sensor.value ) {
      return  <div>
                {sensor.value}<small>{sensor.unity}</small>
              </div>;
    }
    return  <div>
              <i className="fa fa-ban"></i> 
            </div>;
  }

  defineColumns = (cols) => {
    if ( cols > 4 ) {
      return 4;
    } else {
      return 'sensor col-md-' + ( 12 / cols );
    }
  }

  render(){
    return( 
      <div className="row p-5 w-100">
        { this.state.sensors.map( (sensor,i) => 
          <div className={this.defineColumns(this.state.sensors.length)} key={sensor.title + sensor.id}>
            <div className={this.state.setBackground(sensor.color)}>
              <div className="card-body text-center">
                <div className="card-title display-4">
                  <i className={sensor.icon}></i> 
                  { this.getValue(sensor) }
                </div>
                <p className="card-text">{sensor.title} {sensor.history.length}</p>                
                <History ref={sensor.key} sensor={sensor} />
              </div>
            </div>
          </div>
      ) }
      </div>
    )
  }

}

export default Counter;