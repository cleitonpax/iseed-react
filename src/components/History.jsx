import React, { Component } from 'react';

class History extends Component{
  constructor(props){
    super(props);  
       
    this.state = {
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
      },
      isLoading: false,
      error: null,
      sensor: props.sensor
    }   
    setTimeout( () => this.getChart(), 100);     
  }  

  getChart() {
    const labels = [];
    const series = [];
    Object.entries( this.state.sensor.history ).map( i => {
      labels.push( `${ i[1].label.substr( i[1].label.length - 4, i[1].label.length - 1 ) }0` );
      series.push( parseInt( i[1].value, 10) );
    }); 
    const data = {
      labels: labels,
      datasets: [
          {
            label: this.state.sensor.title,
            fillColor: "rgba(255,255,255,1)",
            strokeColor: "rgba(255,255,255,0)",
            pointColor: "rgba(255,255,255,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: series
          }
      ]
    };
    this.setState( { data } );
    // console.log( 'history update', this.state.data );
  }

  render() {   
    const BarChart = require("react-chartjs").Bar;
    return (      
      <BarChart data={this.state.data}  options={this.state.options} /> 
    )
  }

}

export default History;