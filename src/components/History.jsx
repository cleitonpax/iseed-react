import React, { Component } from 'react';
import './../App.css';
import { Grid, Segment } from 'semantic-ui-react';
import Head from './head';
import Footer from './footer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Sensor from './sensor';
import moment from 'moment';

/* eslint-disable react/no-multi-comp */

class History extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      loading: 0,
      lastUpdate: moment().format("h:mm:ss")
    }
  }  
  componentWillMount() {    
    setTimeout( () => this.props.fetchPosts(), 3000 );
    setTimeout( () => this.increaseLoading(), 100 );
  }
  increaseLoading() {
    let loading = this.state.loading;
    let loadingTime = 500 ;
    if ( loading > 98 ) {
      loading = 0;
      loadingTime = 3000;
      this.props.fetchPosts();
      this.setState( { lastUpdate: moment().format("h:mm:ss") } );
    } else {
      loading += 1;
    }
    this.setState( { loading } );
    setTimeout( () => this.increaseLoading(), loadingTime );
  }
  render() { 
    const sensores = this.props.history.map( sens => (      
      <Grid.Column key={sens.id}>
        <Segment color={sens.color} >
          <Sensor sensor={sens}/>
        </Segment>
      </Grid.Column>
    ));      
    return (  
      <div>
        <Head loading={this.state.loading} lastUpdate={this.state.lastUpdate}/>
        <Segment className='p-8 bg-gray'>
        <Grid padded>
          <Grid.Row columns={4}>
            {sensores}         
          </Grid.Row>
        </Grid>
        </Segment>
        <Footer/>
      </div>
    );
  }
};

History.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  history: state.posts.history
})

export default connect( mapStateToProps, {fetchPosts})(History);