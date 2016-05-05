var prefixAll = require('inline-style-prefix-all')
var extend = require('xtend')
var toArray = require('to-array')
var freeStyle = require('./free-style')

module.exports = css

css.rule = rule
css.keyframes = keyframes
css.getCss = getCss

function css (style) {
  if (!style) throw new TypeError('css style object expected')

  return freeStyle().registerStyle(prepare(toArray(arguments)))
}

function rule (key, style) {
  if (!style) throw new TypeError('css style object expected')

  return freeStyle().registerRule(key, prepare(toArray(arguments, 1)))
}

function keyframes (style) {
  if (!style) throw new TypeError('css style object expected')

  return freeStyle().registerKeyframes(prepare(toArray(arguments)))
}

function prepare (styleArray) {
  var style = extend.apply(null, styleArray)

  prefixAll(style)
  important(style)

  return style
}

function important (style) {
  for (var key in style) {
    if (style[key] instanceof Object) {
      style[key] = important(style[key])
    } else {
      style[key] += ' !important'
    }
  }
  return style
}

function getCss () {
  return freeStyle().getStyles()
}
