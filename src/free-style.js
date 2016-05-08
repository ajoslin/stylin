var once = require('once')
var FreeStyle = require('free-style')
var insertStyles = require('insert-styles')

var STYLE_ID = require('./constants').STYLE_ID

// One global style instance
module.exports = once(createStyleInstance)

function createStyleInstance () {
  var Style = FreeStyle.create()

  Style.addChangeListener(onChange)

  return Style

  function onChange () {
    insertStyles(Style.getStyles(), {id: STYLE_ID})
  }
}
