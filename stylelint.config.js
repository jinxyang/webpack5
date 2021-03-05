const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate')

module.exports = {
  plugins: ['stylelint-order', 'stylelint-prettier'],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'order/properties-order': [sortOrderSmacss()],
    'prettier/prettier': true,
  },
}
