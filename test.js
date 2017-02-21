var test = require('tape')
var stylin = require('./')

test('stylin', function (t) {
  var className = stylin({
    color: 'red',
    '.foo': {
      transition: 'color 1s'
    }
  }, {color2: 'green'})

  t.equal(stylin.getCss(), `.${className}{color:red !important;color2:green !important}.${className} .foo{-moz-transition:color 1s !important;-webkit-transition:color 1s !important;transition:color 1s !important}`)
  t.end()
})

test('stylin.unimportant', function (t) {
  var className = stylin.unimportant({color: 'red'})
  t.ok(stylin.getCss().indexOf('.' + className + '{color:red}') !== -1, 'unimportant style added')
  t.ok(stylin.getCss().indexOf('.' + className + '{color:red} !important') === -1, 'important style not added')
  t.end()
})

test('stylin.rule', function (t) {
  stylin.rule('@media print', {
    backgroundColor: 'teal'
  })
  t.ok(stylin.getCss().indexOf('@media print{background-color:teal}') !== -1, 'media style added')
  t.end()
})

test('stylin.keyframes', function (t) {
  var className = stylin.keyframes({
    from: {opacity: 0},
    to: {opacity: 1}
  })
  t.ok(stylin.getCss().indexOf('@keyframes ' + className + '{from{opacity:0}to{opacity:1}') !== -1, 'keyframe style added')
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
