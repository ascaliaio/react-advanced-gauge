import expect from 'expect'

import {
  deg2rad,
} from 'src/utils';

describe('deg2rad function', () => {
  it('Converts 0 correctly', () => {
    expect(deg2rad(0)).toBe(0);
  })
  it('Converts basic values correctly', () => {
    expect(deg2rad(50).toFixed(6)).toBe('0.872665');
    expect(deg2rad(100).toFixed(5)).toBe('1.74533');
    expect(deg2rad(180).toFixed(5)).toBe('3.14159');
  })
})
