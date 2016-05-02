var test = require('tape')
var stylin = require('./')

test(function (t) {
  var className = stylin({color: 'red'})
  t.equal(typeof className, 'string')

  t.equal(stylin.getCss(), '.' + className + '{color:red}')
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
