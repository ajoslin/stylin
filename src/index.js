var prefixAll = require('inline-style-prefix-all')
var extend = require('xtend')
var freeStyle = require('./free-style')
var constants = require('./constants')

module.exports = css

css.unimportant = unimportant
css.rule = rule
css.keyframes = keyframes
css.getCss = getCss
css.STYLE_ID = constants.STYLE_ID

function css (style) {
  if (!style) throw new TypeError('css style object expected')

  return freeStyle().registerStyle(prepareStyle(
    extend.apply(null, arguments),
    true
  ))
}

function unimportant (style) {
  if (!style) throw new TypeError('css style object expected')

  return freeStyle().registerStyle(prepareStyle(
    extend.apply(null, arguments),
    false
  ))
}

function rule (key, style) {
  if (!style) throw new TypeError('css style object expected')

  return freeStyle().registerRule(prepareStyle(
    extend.apply(null, Array.prototype.slice.call(arguments, 1)),
    false
  ))
}

function keyframes (style) {
  if (!style) throw new TypeError('css style object expected')
  return freeStyle().registerKeyframes(prepareStyle(
    extend.apply(null, arguments),
    false
  ))
}

function getCss () {
  return freeStyle().getStyles()
}

function prepareStyle (style, addImportant) {
  prefixAll(style)

  if (addImportant) {
    important(style)
  }

  return style
}

function important (style) {
  if (!style) return
  Object.keys(style).forEach(function (key) {
    if (style && typeof style[key] === 'object') {
      style[key] = important(style[key])
    } else if (String(style[key]).indexOf('!important') === -1) {
      style[key] += ' !important'
    }
  })

  return style
}
