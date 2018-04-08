import React, { Component } from 'react';
import './../App.css';
import { Segment } from 'semantic-ui-react';

/* eslint-disable react/no-multi-comp */

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {	
        responsive: false,
        segmentShowStroke: false,
        percentageInnerCutout : 80,   
        animationSteps : 100,
        animationEasing : "easeOutCubic",
        outerRadius: 0 
      }
    }
  }
  render() {
    const data = [
      {
        value: this.props.loading,
        color:"#fff"
      },
      {
        value: 100 - this.props.loading,
        color:"#6c757d"
      }
    ];
    const DoughnutChart = require("react-chartjs").Doughnut;
    return(
      <Segment inverted className='header'>
        <DoughnutChart width="70" height="70" data={data}  options={this.state.options} />
        <div className="percent">{ this.props.loading } <small>%</small></div>
        <h1 className="title">iSense Hub</h1>
      </Segment>
    )
  }
}

export default Head;