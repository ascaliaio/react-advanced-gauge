import React, {Component} from 'react'
import {render} from 'react-dom'

import { Gauge } from '../../src'

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      colors: ['#FFFF00'],
      value: 0,
      showUnit: false,
    };
  }
  componentDidMount() {
    setInterval(() => this.setState({ value: Math.round(Math.random() * 200) - 120 }), 2000);
  }
  render() {
    return <div>
      <h1>react-advanced-gauge Demo</h1>
      <Gauge
        colors={this.state.colors}
        height={600}
        min={-100}
        max={100}
        label="fkdsljaflkasdj"
        showUnit={this.state.showUnit}
        showDomain
        thresholds={[]}
        unit="Hz"
        value={this.state.value}
        valueMatchColor
        width={400}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
