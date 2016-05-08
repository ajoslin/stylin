var once = require('once')
var FreeStyle = require('free-style')
var document = require('global/document')

var STYLE_ID = require('./constants').STYLE_ID

// One global style instance
module.exports = once(createStyleInstance)

function createStyleInstance () {
  var Style = FreeStyle.create()
  var insertCss = createStyleElement(STYLE_ID)

  Style.addChangeListener(onChange)

  return Style

  function onChange () {
    insertCss(Style.getStyles())
  }
}

function createStyleElement (id) {
  var element = document.getElementById(id)

  if (!element) {
    element = document.createElement('style')
    element.setAttribute('type', 'text/css')
    element.setAttribute('id', id)

    document.head.appendChild(element)
  }

  return function insert (css) {
    if ('textContent' in element) {
      element.textContent = css
    } else if ('styleSheet' in element) {
      element.styleSheet.cssText = css
    } else {
      element.innerHTML = css
    }
  }
}
