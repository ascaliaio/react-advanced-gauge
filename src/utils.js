import { arc } from 'd3-shape';
import {
  MAX_ANGLE,
  MIN_ANGLE,
} from './constants';

const deg2rad = deg => deg * Math.PI / 180;

const calculatePercentage = (min, max, current) => ((max - min) - (max - Number(current))) / (max - min);

const valueInDomain = (min, max, value) => Math.min(Math.max(min, value), max);

export const buildDomain = (height, width, min, max, thresholds) => arc()
  .innerRadius(height * 0.6)
  .outerRadius((height * 0.6) + (height * 0.03))
  .startAngle(function(d,i) {
    if (i === 0) {
      return deg2rad(MIN_ANGLE);  
    }
    const percentage = calculatePercentage(min, max, thresholds[i - 1]);
    return deg2rad(MIN_ANGLE + (percentage * (MAX_ANGLE - MIN_ANGLE)));
  })
  .endAngle(function(d, i) {
    if (thresholds[i+1] === undefined) {
      return deg2rad(MAX_ANGLE)
    }
    const percentage = calculatePercentage(min, max, thresholds[i]);
    return deg2rad(MIN_ANGLE + (percentage * (MAX_ANGLE - MIN_ANGLE)));
  });

export const buildValuePath = (height, min, max, value) => arc()
  .innerRadius(height * 0.4)
  .outerRadius((height * 0.6) - 5)
  .startAngle(deg2rad(MIN_ANGLE))
  .endAngle(() => {
    const percentage = calculatePercentage(min, max, value);
    return deg2rad(MIN_ANGLE + (valueInDomain(0.01, 1, percentage) * (MAX_ANGLE - MIN_ANGLE)));
  });