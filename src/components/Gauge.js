import React, { Component } from 'react';
import { select } from 'd3-selection';
import {} from 'd3-transition/src/selection';
import { interpolateRgbBasis } from 'd3-interpolate';
import { defaults } from '../defaults';
import { types } from '../types';
import { DEFAULT_VALUE_PATH_COLOR } from '../constants';
import {
  buildDomain,
  buildPath,
  buildValuePath,
  Color,
  getContainerSize,
  paintValuePath,
} from '../utils';
import {
  GaugeContainerStyles,
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
      valueMatchColor,
    } = this.props;
    // TODO: Implement handling of other props changes
    if (prevProps.value !== this.props.value) {
      this.changeValue(value, min, max, valueMatchColor);
    } else {
      this.renderGauge();
    }
  }

  changeValue(value, min, max, valueMatchColor = false) {
    this.textValue
      .text(value)
      .style('fill', valueMatchColor ? paintValuePath(value, this.completeThresholds, this.paint) : DEFAULT_VALUE_PATH_COLOR)
    if (this.valueLine) {
      // TODO: add animation based on animated prop
      this.valueLine
        .attr('d', buildValuePath(this.SVGsize, min, max, value))
        .style('fill', paintValuePath(value, this.completeThresholds, this.paint));
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
      valueMatchColor,
      width,
    } = this.props;

    if (this.chartContainer) {
      this.chartContainer.remove();
    }

    const el = this.container;
    this.containerWidth = width ? width - 20 : getContainerSize(this.sizeContainer)[0];;
    this.containerHeight = height ? height - 20 : getContainerSize(this.sizeContainer)[1];
    this.smallerSide = Math.min(this.containerHeight, this.containerWidth);
    // const gaugeHeight = this.smallerSide * 0.8;
    this.SVGsize = this.smallerSide * 0.7;

    this.completeThresholds = thresholds ? [...thresholds, max] : [max];
    // this.paint = interpolateRgbBasis(colors);
    if (
      colors &&
      this.completeThresholds.length !== colors.length
    ) {
      throw Error('Number of colors should always be 1 more than the number of colors provided');
    }

    this.paint = new Color(colors, this.completeThresholds.length);

    this.chartContainer = select(el).append('svg:svg')
      .attr('class', 'chart')
      .attr('height', this.smallerSide)
      .attr('width', this.smallerSide)

    const chart = this.chartContainer
      .append('svg:g')
      .attr('transform', `translate(${this.smallerSide / 2},${(this.smallerSide / 2) * 1.25})`);

    if (showDomain) {
      chart.selectAll('path')
        .data(this.completeThresholds)
        .enter().append('svg:path')
        .style('fill', (d, i) => this.paint.get(i))
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
      .attr('class', 'rag-domain-min')
      .style('transform', `translate(-${valuePathGroup.node().getBBox().width / 2}px, ${this.SVGsize/5}px)`);

    domainLabel.append('svg:text')
      .text(max)
      .style('font-size', `${this.SVGsize/16}px`)
      .style('fill', '#555')
      .style('text-anchor', 'middle')
      .attr('class', 'rag-domain-max')
      .style('transform', `translate(${valuePathGroup.node().getBBox().width / 2}px, ${this.SVGsize/5}px)`);

    this.valueLine = chart.append('svg:path')
			// .style('fill', this.paint.colourAt(this.completeThresholds.findIndex(threshold => value < threshold)))
			.style('fill', paintValuePath(value, this.completeThresholds, this.paint))
      .attr('d', buildValuePath(this.SVGsize, min, max, value));

    this.textValue = chart.append('svg:text')
      .text(value)
      .style('font-size', `${this.SVGsize/4}px`)
      .style('font-weight', '600')
      .style('fill', valueMatchColor ? paintValuePath(value, this.completeThresholds, this.paint) : DEFAULT_VALUE_PATH_COLOR)
      .style('text-anchor', 'middle')
      .style('transform', `translateY(${this.SVGsize/10}px)`);

      if (showUnit) {
        chart.append('svg:text')
          .text(unit)
          .style('font-size', `${this.SVGsize/12}px`)
          .style('font-weight', '600')
          .style('fill', '#555')
          .style('text-anchor', 'middle')
          .style('transform', `translateY(${this.SVGsize/4}px)`);
      }
  }

  render() {
    const {
      height,
      width,
    } = this.props;

    return (
      <div
        className="rag-container"
        ref={cont => this.sizeContainer = cont}
        style={{
          height: height,
          width: width,
          ...GaugeContainerStyles
        }}
      >
        <div ref={cont => this.container = cont} />
      </div>
    )
  }
}

export default Gauge;