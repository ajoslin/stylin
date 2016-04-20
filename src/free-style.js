var once = require('once')
var FreeStyle = require('free-style')
var debounce = require('next-tick-debounce')
var insertStyles = require('insert-styles')

var STYLE_ID = 'FREESTYLIN'

// One global style instance
module.exports = once(createStyleInstance)

function createStyleInstance () {
  var Style = FreeStyle.create()

  // Debounce all insertions to the next tick so we don't write the same style element
  // hundreds of times at once
  Style.addChangeListener(debounce(onChange))

  return Style

  function onChange () {
    insertStyles(Style.getStyles(), {id: STYLE_ID})
  }
}
