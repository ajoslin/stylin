var prefix = require('inline-style-prefix-all')
var getStyle = require('./free-style')

module.exports = css

css.rule = rule
css.keyframes = keyframes

function css (rules) {
  return getStyle().registerStyle(prefix(rules))
}

function rule (key, rules) {
  return getStyle().registerRule(key, prefix(rules))
}

function keyframes (rules) {
  return getStyle().registerKeyframes(prefix(rules))
}
