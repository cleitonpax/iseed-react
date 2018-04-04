import moment from 'moment';

const url = 'https://api.thingspeak.com/channels/418642/feeds.json?api_key=JHAQ9SYJPAD9W071&results=100';
const getHistory = () => {
  fetch(url)
    .then(response => {
      if (response.ok) { 
        return response.json(); 
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(data => {
      this.setState({ isLoading: false });
      getSensorHistory( data );
    })
    .catch(error => { 
      this.setState({ error, isLoading: false });
      console.log( error );
    });
}

const getSensorHistory = ( data ) => {
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
    item.history = groupHistory( item );
    // Get last value and unity
    if ( item.key === 'light' || item.key === 'temp' ) {        
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

const groupHistory = ( item ) => {
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
    out[ i.created_at ][ 'value' ] = ( item.key === 'light' || item.key === 'temp' )
      ? parseInt( i.value, 10 )
      : parseInt( count, 10 );                 
  });
  return out;
} 

exports.getHistory = getHistory;