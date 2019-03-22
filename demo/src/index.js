import React, {Component} from 'react'
import {render} from 'react-dom'

import ReactAdvancedGauge from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>react-advanced-gauge Demo</h1>
      <ReactAdvancedGauge value="70" />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
