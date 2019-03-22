import React, {Component} from 'react'
import t from 'prop-types'
import Gauge from './components/Gauge';

export default class extends Component {

  static propTypes = {
    min: t.number,
    max: t.number,
    value: t.number.isRequired,
  }

  static defaultProps = {
    min: 0,
    max: 100,
  }

  render() {
    const {
      value,
    } = this.props;
    return <div>
      <Gauge
        height={200}
        thresholds="40,70"
        value={value}
        width={300}
      />
    </div>
  }
}
