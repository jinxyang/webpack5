const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate')

module.exports = {
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard'],
  rules: {
    'order/properties-order': [sortOrderSmacss()],
  },
}
