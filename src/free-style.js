var FreeStyle = require('free-style')
var insertStyles = require('insert-styles')

var STYLE_ID = '__stylin__'
var changeId = null

var freeStyle = module.exports = {
  Style: FreeStyle.create(),
  STYLE_ID: STYLE_ID,
  getStyles: getStyles
}
freeStyle.registerStyle = createStyleFunction('registerStyle')
freeStyle.registerRule = createStyleFunction('registerRule')
freeStyle.registerKeyframes = createStyleFunction('registerKeyframes')

function getStyles () {
  return freeStyle.Style.getStyles()
}

function createStyleFunction (methodName) {
  var method = freeStyle.Style[methodName]

  return function register () {
    var result = method.apply(freeStyle.Style, arguments)

    if (freeStyle.Style.changeId !== changeId) {
      insertStyles(freeStyle.Style.getStyles(), {id: STYLE_ID})
      changeId = freeStyle.Style.changeId
    }

    return result
  }
}
