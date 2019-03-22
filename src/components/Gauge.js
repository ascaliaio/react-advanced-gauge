import React, { Component } from 'react';
import { select } from 'd3-selection';
import Rainbow from 'rainbowvis.js';
import { defaults } from '../defaults';
import { types } from '../types';
import {
  buildDomain,
  buildValuePath,
} from '../utils';

class Gauge extends Component {

  static propTypes = types; 

  static defaultProps = defaults;

  componentDidMount() {
    this.renderGauge();
  }

  componentDidUpdate() {
    this.container && select(this.container).html(null);
    this.renderGauge();
  }

  renderGauge() {
    const {
      height,
      max,
      min,
      showDomain,
      thresholds,
      value,
      width,
    } = this.props;

    const el = this.container;
    // const containerHeight = el.clientHeight - 100;
    const containerHeight = height;
    // const containerWidth = el.clientWidth - 100;
    const containerWidth = width;
    const gaugeHeight = containerHeight * 0.8;
    const smallerSide = Math.min(height, width);

    const completeThresholds = thresholds ? [...thresholds.split(','), max] : [max];

    const paint = new Rainbow();
    paint.setSpectrum('green', 'orange', 'red');
    paint.setNumberRange(0, Math.max(completeThresholds.length - 1, 1));

    const chart = select(el).append('svg:svg')
			.attr('class', 'chart')
      .attr('height', containerHeight)
			.attr('width', containerWidth)
      .append('svg:g')
      .attr('transform', `translate(${containerWidth/2 },${containerWidth/2 + gaugeHeight/4})`);

    const domain = buildDomain(containerHeight, containerWidth, min, max, completeThresholds);

    chart.selectAll('path')
      .data(completeThresholds)
      .enter().append('svg:path')
      .style('fill', function(d, i){
        return paint.colourAt(i);
      })
      .attr('d', domain);

    const line = buildValuePath(containerHeight, min, max, value);

    this.valueLine = chart.append('svg:path')
      .data([{ value: value !== '-' ? Math.max(Math.min(value, max), min) : 0 }])
			.style('fill', paint.colourAt(completeThresholds.findIndex(threshold => value < threshold)))
      .attr('d', line);

    chart.append('svg:text')
      .text(value)
      .style('font-size', `${smallerSide/5}px`)
      .style('font-weight', '600')
      .style('fill', '#555')
      .style('text-anchor', 'middle')
      .style('transform', `translateY(${smallerSide/10}px)`);
  }

  render() {
    return (
      <div ref={cont => this.container = cont} style={{ width: '500px', height: '400px', background: '#eee' }} />
    )
  }
}

export default Gauge;