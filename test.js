var test = require('tape')
var stylin = require('./')

test('stylin', function (t) {
  var className = stylin({
    color: 'red',
    '.foo': {
      width: 'calc(100%)'
    }
  }, {color2: 'green'})

  t.equal(stylin.getCss(), `.${className}{color:red !important;color2:green !important}.${className} .foo{width:-webkit-calc(100%) !important;width:-moz-calc(100%) !important;width:calc(100%) !important}`)
  t.end()
})

test('stylin.unimportant', function (t) {
  var className = stylin.unimportant({color: 'red'})
  t.ok(stylin.getCss().indexOf('.' + className + '{color:red}') !== -1, 'unimportant style added')
  t.ok(stylin.getCss().indexOf('.' + className + '{color:red} !important') === -1, 'important style not added')
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
