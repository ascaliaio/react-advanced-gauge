import React, {Component} from 'react'
import {render} from 'react-dom'

import { Gauge } from '../../src'

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    };
  }
  componentDidMount() {
    // setInterval(() => this.setState({ value: this.state.value + Math.round(Math.random() * 20) - 10}), 2000);
    setInterval(() => this.setState({ value: Math.round(Math.random() * 200) - 100}), 2000);
  }
  render() {
    return <div>
      <h1>react-advanced-gauge Demo</h1>
      <Gauge
        height={500}
        min={-100}
        max={100}
        label="fkdsljaflkasdj "
        thresholds="50,70,90"
        value={this.state.value}
        // showDomain={false}
        width={800}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
