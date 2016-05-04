var prefixAll = require('inline-style-prefix-all')
var freeStyle = require('./free-style')

module.exports = css

css.rule = rule
css.keyframes = keyframes
css.getCss = getCss

function css (style) {
  if (!style) throw new TypeError('css style object expected')

  return freeStyle().registerStyle(prefix(style))
}

function rule (key, style) {
  if (!style) throw new TypeError('css style object expected')

  return freeStyle().registerRule(key, prefix(style))
}

function keyframes (style) {
  if (!style) throw new TypeError('css style object expected')

  return freeStyle().registerKeyframes(prefix(style))
}

function prefix (style) {
  prefixAll(style)
  important(style)

  return style
}

function important (style) {
  for (var key in style) {
    if (style[key] instanceof Object) {
      style[key] = important(style[key])
    } else if (String(style[key]).indexOf(important) === -1) {
      style[key] += ' !important'
    }
  }
  return style
}

function getCss () {
  return freeStyle().getStyles()
}
