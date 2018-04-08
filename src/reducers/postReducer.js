import { FETCH_POSTS } from '../actions/types';
import moment from 'moment';

const initialState = {
  channel: {},
  history: [],
  sensors: require('./../store/Sensors.json')
};

export default function(state = initialState, action) {
  switch( action.type ) {
    case FETCH_POSTS: 
      const history = getSensorHistory(action.payload);
      return {
        ...state,
        channel: action.payload.channel,
        history
      }
    default:
      return state;
  }  
}

const getFieldKey = (item, channel) => {
  Object.keys( channel ).map( (key, index) => {
    if ( channel[key] === item.key ) {
      item.channelKey = key;
    }
    return true;
  });
  return item;
}

const getFieldValue = (item, feeds) => {
  let value = null;
  feeds.map( feed => {
    if ( typeof feed[ item.channelKey ] !== 'undefined' && feed[ item.channelKey ] ) {
      item.history.push( { value: feed[ item.channelKey ], created_at: feed['created_at'].substr(0,15) } );
      value = feed[ item.channelKey ];
    }
    return true;
  });
  return { value, history: item.history };
}

const getLastValue = (item, value, feeds) => {
  if ( item.key === 'light' || item.key === 'gas' ) {        
    if ( value ) item.value = value
  } else if ( item.key === 'humidity' ) {        
    if ( value ) item.value = (value * 100 / 1024).toFixed( 2 )
  } else if ( item.key === 'temp' ) {        
    if ( value ) item.value = parseFloat(value).toFixed( 2 )
  } else {
    // Calculate time from the last movement
    const fromNow = moment( feeds[0]['created_at'] ).fromNow();
    item.value = fromNow.split(' ')[0];
    item.unity = fromNow.substr( item.value.length, fromNow.length - 1 );
  }
  return { lastValue: item.value, unity: item.unity };
}

const getSensorHistory = (data) => {
  let sensors = JSON.parse(JSON.stringify( initialState.sensors ));
  sensors.map( (item, key) => { 
    item = getFieldKey(item, data.channel);
    console.log(item);
    const { value, history } = getFieldValue(item, data.feeds);
    item.history = groupHistory( history, item.key );
    const { lastValue, unity } = getLastValue(item, value, data.feeds);
    item.value = lastValue;
    item.unity = unity;
    return true;
  });
  return sensors;
}

const groupHistory = ( history, key ) => {
  const out = {};
  let count = 0;
  history.map( log => { 
    // Increment accumulator if item exists 
    if ( out[ log.created_at ] ) {
      count += parseInt( log.value, 10 );
    } else { // Create new item if not exists
      out[ log.created_at ] = {
        label: log.created_at,
        value: 0
      };
    }
    // Explicity data takes the last value, binary logs accumulate the total entries 
    out[ log.created_at ][ 'value' ] = ( key === 'light' || key === 'temp' )
      ? parseInt( log.value, 10 )
      : parseInt( count, 10 ); 
    return true;                
  });
  return out;
} 