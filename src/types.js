import t from 'prop-types'

export const types = {
  animated: t.bool,
  colors: t.array,
  height: t.number,
  isNegative: t.bool,
  min: t.number,
  max: t.number,
  showDomain: t.bool,
  showLabel: t.bool,
  showUnit: t.bool,
  thresholds: t.arrayOf(t.number),
  unit: t.string,
  value: t.number.isRequired,
  valueMatchColor: t.bool,
  width: t.number,
}

