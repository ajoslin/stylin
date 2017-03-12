var test = require('tape')
var stylin = require('./')

test('stylin', function (t) {
  var className = stylin({
    color: 'green',
    '.foo': {
      transition: 'color 1s'
    }
  })

  t.equal(stylin.getCss(), `.${className}{color:green !important}.${className} .foo{-moz-transition:color 1s !important;-webkit-transition:color 1s !important;transition:color 1s !important}`)

  var className2 = stylin({
    color: 'red'
  })
  t.equal(stylin.getCss(), `.${className}{color:green !important}.${className} .foo{-moz-transition:color 1s !important;-webkit-transition:color 1s !important;transition:color 1s !important}.${className2}{color:red !important}`)
  t.end()
})

test('stylin.reset()', function (t) {
  t.ok(stylin.getCss())
  stylin.reset()
  t.notOk(stylin.getCss())
  t.end()
})

test('stylin.unimportant', function (t) {
  var className = stylin.unimportant(
    {color: 'red'},
    {styleId: 'test-unimportant'}
  )
  t.equal(stylin.getCss('test-unimportant'), `.${className}{color:red}`)
  t.end()
})

test('stylin.rule', function (t) {
  stylin.rule(
    '@media print',
    {backgroundColor: 'teal'},
    {styleId: 'test-rule'}
  )
  t.ok(stylin.getCss('test-rule'), '@media print{background-color:teal}')
  t.end()
})

test('stylin.keyframes', function (t) {
  var className = stylin.keyframes(
    {
      from: {opacity: 0},
      to: {opacity: 1}
    },
    {styleId: 'test-keyframes'}
  )
  t.equal(stylin.getCss('test-keyframes'), `@keyframes ${className}{from{opacity:0}to{opacity:1}}`)
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
