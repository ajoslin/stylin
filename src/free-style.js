var FreeStyle = require('free-style')
var insertStyles = require('insert-styles')
var window = require('global/window')

var styleInstancesById = {}
var DEFAULT_STYLE_ID = '__stylin__'

// Support multiple instances of the module in the same document.
module.exports = window.__stylin_data__ = window.__stylin_data__ || {
  STYLE_ID: DEFAULT_STYLE_ID,
  getStyles: getStyles,
  reset: reset,
  registerStyle: createStyleFunction('registerStyle', 1),
  registerKeyframes: createStyleFunction('registerKeyframes', 1),
  registerRule: createStyleFunction('registerRule', 2)
}

function getStyles (styleId) {
  var byId = styleInstancesById[styleId || DEFAULT_STYLE_ID]
  return byId && byId.Style ? byId.Style.getStyles() : ''
}

function reset () {
  styleInstancesById = {}
}

function createStyleFunction (methodName, arity) {
  return function styleFn () {
    var args = Array.prototype.slice.call(arguments)
    var opts = args.length > arity ? args.pop() : null
    var styleId = opts && opts.styleId ? opts.styleId : DEFAULT_STYLE_ID

    var byId = styleInstancesById[styleId] = styleInstancesById[styleId] || {
      Style: FreeStyle.create(),
      changeId: null
    }
    var Style = byId.Style
    var changeId = byId.changeId

    var result = Style[methodName].apply(Style, args)
    if (Style.changeId !== changeId) {
      insertStyles(Style.getStyles(), {id: styleId})
      byId.changeId = Style.changeId
    }

    return result
  }
}
