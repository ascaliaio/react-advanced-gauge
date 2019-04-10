import t from 'prop-types'

export const types = {
  colors: t.array,
  height: t.number,
  isNegative: t.bool,
  label: t.oneOfType([t.string, t.element]),
  labelStyles: t.object,
  min: t.number,
  max: t.number,
  showDomain: t.bool,
  showLabel: t.bool,
  showUnit: t.bool,
  unit: t.string,
  value: t.number.isRequired,
  width: t.number,
}

