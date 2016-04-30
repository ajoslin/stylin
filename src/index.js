var prefix = require('inline-style-prefix-all')
var freeStyle = require('./free-style')

module.exports = css

css.rule = rule
css.keyframes = keyframes
css.getCss = getCss

function css (rules) {
  return freeStyle().registerStyle(prefix(rules))
}

function rule (key, rules) {
  return freeStyle().registerRule(key, prefix(rules))
}

function keyframes (rules) {
  return freeStyle().registerKeyframes(prefix(rules))
}

function getCss () {
  return freeStyle().getStyles()
}
