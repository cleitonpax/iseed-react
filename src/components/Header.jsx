import React, { Component } from 'react';
import LoadingLoop from './LoadingLoop';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getUpdate = () => {
    this.props.getUpdate();
  }

  render() {
    return (
      <div className="header row">
        <div className="title col-md-4 display-4 text-white text-center">
          <LoadingLoop getUpdate={this.getUpdate}/> 
          {this.props.header.title}
        </div>          
        <div className="col-md-8 pt-4">
          <div className="lead text-muted pr-5">               
            { this.props.header.description }
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
