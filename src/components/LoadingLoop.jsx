import React, { Component } from 'react';

class LoadingLoop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 0,
      options: {	
        responsive: false,
        segmentShowStroke: false,
        percentageInnerCutout : 80,   
        animationSteps : 100,
        animationEasing : "easeOutCubic",
        outerRadius: 0 
      },
      data: []
    }    
    setTimeout( () => this.increaseLoading(), 100 );
  }

  increaseLoading() {
    let loading = this.state.loading;
    let loadingTime = 1500 ;
    if ( loading > 96 ) {
      loading = 0;
      loadingTime = 3000;
    } else {
      loading += 5;
    }
    const data = [
      {
        value: loading,
        color:"#fff"
      },
      {
        value: 100 - loading,
        color:"#6c757d"
      }
    ];
    this.setState( { data, loading } );
    if ( loading > 96 ) {
      this.props.getUpdate();
    }
    setTimeout( () => this.increaseLoading(), loadingTime );
  }

  render() {
    const DoughnutChart = require("react-chartjs").Doughnut;
    return (
      <DoughnutChart width="50" height="50" data={this.state.data}  options={this.state.options} />
    )
  }
}

export default LoadingLoop;