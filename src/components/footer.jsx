import React, { Component } from 'react';
import './../App.css';
import {
  Container,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react';

/* eslint-disable react/no-multi-comp */

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {       
    };
  };
  render() {    
    return (  
      <div className="footer">
        <Segment inverted vertical>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>            
                <Grid.Column >
                  <Header as='h4' inverted>iSense 2018</Header>
                  <p><small>IoT Dashboard - Arduino Mega + ESP8266 | ThingSpeak Api | ReactJs</small></p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
};

export default Footer;