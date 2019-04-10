import React, { Component } from 'react';
import { select } from 'd3-selection';
import {} from 'd3-transition/src/selection';
import Rainbow from 'rainbowvis.js';
import { defaults } from '../defaults';
import { types } from '../types';
import {
  buildDomain,
  buildPath,
  buildValuePath,
  getContainerSize,
} from '../utils';
import {
  GaugeContainerStyles,
  GaugeLabelStyles,
} from '../styles';

class Gauge extends Component {

  static propTypes = types; 

  static defaultProps = defaults;

  componentDidMount() {
    this.renderGauge();
  }

  componentDidUpdate(prevProps) {
    const {
      max,
      min,
      value,
    } = this.props;
    // TODO: Implement handling of other props changes
    if (prevProps.value !== this.props.value) {
      this.changeValue(value, min, max);
    }
  }

  changeValue(value, min, max) {
    this.textValue.text(value);
    if (this.valueLine) {
      this.valueLine
        .style('fill', this.paint.colourAt(this.completeThresholds.findIndex(threshold => value < threshold)))
        .attr('d', buildValuePath(this.SVGsize, min, max, value));
    }
  }

  renderGauge() {
    const {
      colors,
      height,
      max,
      min,
      showDomain,
      showUnit,
      thresholds,
      unit,
      value,
      width,
    } = this.props;

    const el = this.container;
    this.containerWidth = width ? width - 50 : getContainerSize(this.sizeContainer)[0];;
    this.containerHeight = height ? height - 50 : getContainerSize(this.sizeContainer)[1];
    this.smallerSide = Math.min(this.containerHeight, this.containerWidth);
    const gaugeHeight = this.smallerSide * 0.8;
    this.SVGsize = this.smallerSide * 0.6;

    this.completeThresholds = thresholds ? [...thresholds.split(','), max] : [max];

    this.paint = new Rainbow();
    this.paint.setSpectrum(...colors);
    this.paint.setNumberRange(0, Math.max(this.completeThresholds.length - 1, 1));

    const chart = select(el).append('svg:svg')
			.attr('class', 'chart')
      .attr('height', this.smallerSide)
			.attr('width', this.smallerSide)
      .append('svg:g')
      .attr('transform', `translate(${this.containerHeight/2 },${this.SVGsize})`);

    if (showDomain) {
      chart.selectAll('path')
        .data(this.completeThresholds)
        .enter().append('svg:path')
        .style('fill', (d, i) => this.paint.colourAt(i))
        .attr('d', buildDomain(this.SVGsize, this.SVGsize, min, max, this.completeThresholds));
    }

    const path = buildPath(this.SVGsize);
    const valuePathGroup = chart.append('svg:g');

    valuePathGroup.append('svg:path')
    .style('fill', 'rgba(0,0,0,0.05)')
    .attr('d', path);

    const domainLabel = valuePathGroup
      .append('svg:g')
      .attr('class', 'domainLabel');

    domainLabel.append('svg:text')
      .text(min)
      .style('font-size', `${this.SVGsize/16}px`)
      .style('fill', '#555')
      .style('text-anchor', 'middle')
      .attr('class', 'kita')
      .style('transform', `translate(-${valuePathGroup.node().getBBox().width / 2}px, ${this.SVGsize/6}px)`);

    domainLabel.append('svg:text')
      .text(max)
      .style('font-size', `${this.SVGsize/16}px`)
      .style('fill', '#555')
      .style('text-anchor', 'middle')
      .attr('class', 'kita')
      .style('transform', `translate(${valuePathGroup.node().getBBox().width / 2}px, ${this.SVGsize/6}px)`);

    this.valueLine = chart.append('svg:path')
			.style('fill', this.paint.colourAt(this.completeThresholds.findIndex(threshold => value < threshold)))
      .attr('d', buildValuePath(this.SVGsize, min, max, value));

    this.textValue = chart.append('svg:text')
      .text(value)
      .style('font-size', `${this.SVGsize/5}px`)
      .style('font-weight', '600')
      .style('fill', '#555')
      .style('text-anchor', 'middle')
      .style('transform', `translateY(${this.SVGsize/10}px)`);

      if (showUnit) {
        chart.append('svg:text')
          .text(unit)
          .style('font-size', `${this.SVGsize/15}px`)
          .style('font-weight', '600')
          .style('fill', '#555')
          .style('text-anchor', 'middle')
          .style('transform', `translateY(${this.SVGsize/5}px)`);
      }
  }

  render() {
    const {
      height,
      label,
      labelStyles,
      width,
    } = this.props;

    return (
      <div
        ref={cont => this.sizeContainer = cont}
        style={{
          height: height,
          width: width,
          ...GaugeContainerStyles
        }}
      >
        <div ref={cont => this.container = cont} />
        <div
          style={{
            ...GaugeLabelStyles,
            ...labelStyles,
          }}
        >
          {label}
        </div>
      </div>
    )
  }
}

export default Gauge;