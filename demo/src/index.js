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
    setInterval(() => this.setState({ value: Math.round(Math.random() * 500) - 200}), 2000);
  }
  render() {
    return <div>
      <h1>react-advanced-gauge Demo</h1>
      <Gauge
        height={300}
        min={-100}
        max={100}
        label="fkdsljaflkasdj "
        thresholds="50,70,90"
        value={this.state.value}
        // showDomain={false}
        // width={300}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
