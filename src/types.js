import t from 'prop-types'

export const types = {
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
  width: t.number,
}

