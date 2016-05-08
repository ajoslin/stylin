var test = require('tape')
var stylin = require('./')

test(function (t) {
  var className = stylin({
    color: 'red',
    '.foo': {
      width: 'calc(100%)'
    }
  }, {color2: 'green'})
  t.equal(stylin.getCss(), '.' + className + '{color:red !important;color2:green !important}.' + className + ' .foo{width:-webkit-calc(100%) !important;width:-moz-calc(100%) !important;width:calc(100%) !important}')
  t.end()
})

test('errors', function (t) {
  t.throws(function () {
    stylin.css()
  }, TypeError)
  t.throws(function () {
    stylin.rule('foo')
  }, TypeError)
  t.throws(function () {
    stylin.keyframes()
  }, TypeError)

  t.end()
})

test('constant: style id', function (t) {
  t.equal(typeof stylin.STYLE_ID, 'string')
  t.end()
})
