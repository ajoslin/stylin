var prefix = require('prefix-lite').default
var cssKey = require('css-key')

module.exports = function formatStyles (selector, style) {
  var sheet = {}
  sheet[selector] = transform(style)

  return sheet

  function transform (style) {
    // By default, add styles to the root of the sheet
    style = prefix(style)

    return Object.keys(style).reduce(reduce, {})

    function reduce (acc, key) {
      if (String(key).charAt(0) === ':') {
        sheet[selector + key] = transform(style[key])
      } else {
        acc[cssKey(key)] = style[key]
      }

      return acc
    }
  }
}
