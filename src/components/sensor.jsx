import React, { Component } from 'react';
import './../App.css';

/* eslint-disable react/no-multi-comp */

class Sensor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor: this.props.sensor,
      options: {	
        responsive: true,
        barValueSpacing : 2,
        scaleLineColor: "rgba(255,255,255,0)",
        scaleShowVerticalLines: false,
        scaleFontSize : 8,
        scaleFontColor : "rgba(255,255,255,0.5)",
        scaleShowGridLines : false,
        scaleGridLineColor : "rgba(0,0,0,0)"
      },
      data: {
        labels: [],
        datasets: [
            {
              label: props.sensor.title,
              fillColor: "rgba(255,255,255,1)",
              strokeColor: "rgba(255,255,255,0)",
              pointColor: "rgba(255,255,255,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: []
            }
        ]
      }
    }
  }

  componentWillMount() {
    this.getChart();
  }

  getChart() {
    const { labels, series } = this.getGraphData();
    const data = {
      labels: [],
      datasets: [
          {
            label: this.state.sensor.title,
            fillColor: "rgba(255,255,255,1)",
            strokeColor: "rgba(255,255,255,0)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
          }
      ]
    };
    this.setState( { data } );    
    data.labels = labels;
    data.datasets[0].data = series;
    setTimeout( () => this.setState( { data } ), 1000);    
  }
  
  getGraphData() {
    const labels = [];
    const series = [];
    Object.entries( this.state.sensor.history ).map( i => {
      labels.push( `${ i[1].label.substr( i[1].label.length - 4, i[1].label.length - 1 ) }0` );
      series.push( parseInt( i[1].value, 10) );
      return true;
    }); 
    return { labels, series };
  }  

  render() { 
    const BarChart = require("react-chartjs").Bar;
    const sensor = this.state.sensor;
    return (  
      <div key={sensor.id} className="sensor">
        <i className={sensor.icon}></i>
        <h2>{sensor.value}<small> {sensor.unity}</small></h2>
        <h3>{sensor.title}</h3>
        <BarChart data={this.state.data} options={this.state.options} /> 
      </div>
    );
  }
};

export default Sensor;