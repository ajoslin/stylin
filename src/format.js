var Prefixer = require('inline-style-prefixer')

var prefixer = new Prefixer({keepUnprefixed: true})

module.exports = function formatStyles (selector, style) {
  var result = {}
  result[selector] = {}

  Object.keys(style).forEach(function (key) {
    if (key.charAt(0) === ':') {
      // Copy pseudo styles into a new selector
      result[selector + key] = style[key]
    } else {
      // Copy normal styles into the normal selector
      result[selector][key] = style[key]
    }
  })

  return prefixer.prefix(result)
}
