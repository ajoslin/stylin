var toCss = require('to-css')
var insertStyles = require('insert-styles')
var hashJson = require('./hash')
var formatStyles = require('./format')

var cache = {}

module.exports = Stylin

function Stylin (style) {
  var hash = hashJson(style)
  if (cache[hash]) return cache[hash]

  var selector = '._' + hash
  var css = toCss(formatStyles(selector, style))

  insertStyles(css)
  cache[hash] = selector
  return selector
}
