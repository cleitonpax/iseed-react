import { FETCH_POSTS } from './types';

export const fetchPosts = () => dispatch => {  
    fetch('https://api.thingspeak.com/channels/418642/feeds.json?api_key=JHAQ9SYJPAD9W071&results=50')
      .then(res => res.json())
      .then(res => {
          dispatch({
            type: FETCH_POSTS,
            payload: res
          })
        }
      );
}