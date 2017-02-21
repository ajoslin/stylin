var prefixAll = require('inline-style-prefixer/static')
var assign = require('xtend/mutable')
var freeStyle = require('./free-style')
var constants = require('./constants')

module.exports = css

css.unimportant = unimportant
css.rule = rule
css.keyframes = keyframes
css.getCss = getCss
css.STYLE_ID = constants.STYLE_ID

function css (style) {
  if (!style) throw new TypeError('stylin: css style object expected')

  return freeStyle().registerStyle(prepareStyle(
    assign.apply(null, arguments),
    true
  ))
}

function unimportant (style) {
  if (!style) throw new TypeError('stylin.unimportant: css style object expected')

  return freeStyle().registerStyle(prepareStyle(
    assign.apply(null, arguments),
    false
  ))
}

function rule (key, style) {
  if (!key || !style) throw new TypeError('stylin.rule: parameters (key, style) expected')

  return freeStyle().registerRule(
    key,
    prepareStyle(
      assign.apply(null, Array.prototype.slice.call(arguments, 1)),
      false
    )
  )
}

function keyframes (style) {
  if (!style) throw new TypeError('stylin.keyframes: css style object expected')

  return freeStyle().registerKeyframes(prepareStyle(
    assign.apply(null, Array.prototype.slice.call(arguments)),
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
