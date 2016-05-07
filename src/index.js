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

  return freeStyle().registerStyle(prepare(toArray(arguments), true))
}

function rule (key, style) {
  if (!style) throw new TypeError('css style object expected')

  return freeStyle().registerRule(key, prepare(toArray(arguments, 1)))
}

function keyframes (style) {
  if (!style) throw new TypeError('css style object expected')

  return freeStyle().registerKeyframes(prepare(toArray(arguments)))
}

function getCss () {
  return freeStyle().getStyles()
}

function prepare (styleArray, addImportant) {
  var style = extend.apply(null, styleArray)

  prefixAll(style)

  if (addImportant) {
    important(style)
  }

  return style
}

function important (style) {
  Object.keys(style).forEach(function (key) {
    if (typeof style[key] === 'object') {
      style[key] = important(style[key])
    } else if (String(style[key]).indexOf('!important') === -1) {
      style[key] += ' !important'
    }
  })

  return style
}
