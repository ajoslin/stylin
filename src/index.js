var prefixAll = require('inline-style-prefixer/static')
var freeStyle = require('./free-style')

var hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = exports.default = css

css.unimportant = unimportant
css.rule = rule
css.keyframes = keyframes
css.getCss = freeStyle.getStyles
css.STYLE_ID = freeStyle.STYLE_ID

function css (style) {
  if (!style) throw new TypeError('stylin: css style object expected')

  return freeStyle.registerStyle(prepareStyle(true, style))
}

function unimportant (style) {
  if (!style) throw new TypeError('stylin.unimportant: css style object expected')

  return freeStyle.registerStyle(prepareStyle(false, style))
}

function rule (key, style) {
  if (!key || !style) throw new TypeError('stylin.rule: parameters (key, style) expected')

  return freeStyle.registerRule(key, prepareStyle(false, style))
}

function keyframes (style) {
  if (!style) throw new TypeError('stylin.keyframes: css style object expected')

  return freeStyle.registerKeyframes(prepareStyle(false, style))
}

function prepareStyle (addImportant, styles) {
  prefixAll(styles)

  if (addImportant) {
    important(styles)
  }

  return styles
}

function important (style) {
  for (var key in style) {
    if (!hasOwnProperty.call(style, key)) continue

    if (style && typeof style[key] === 'object') {
      style[key] = important(style[key])
    } else if (String(style[key]).indexOf('!important') === -1) {
      style[key] += ' !important'
    }
  }

  return style
}
