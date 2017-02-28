var test = require('tape')
var stylin = require('./')
var freeStyle = require('./src/free-style')
var FreeStyle = require('free-style')

test('stylin', function (t) {
  freeStyle.Style = FreeStyle.create()
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

test('stylin.unimportant', function (t) {
  freeStyle.Style = FreeStyle.create()
  var className = stylin.unimportant({color: 'red'})
  t.equal(stylin.getCss(), `.${className}{color:red}`)
  t.end()
})

test('stylin.rule', function (t) {
  freeStyle.Style = FreeStyle.create()
  stylin.rule('@media print', {
    backgroundColor: 'teal'
  })
  t.ok(stylin.getCss(), '@media print{background-color:teal}')
  t.end()
})

test('stylin.keyframes', function (t) {
  freeStyle.Style = FreeStyle.create()
  var className = stylin.keyframes({
    from: {opacity: 0},
    to: {opacity: 1}
  })
  t.equal(stylin.getCss(), `@keyframes ${className}{from{opacity:0}to{opacity:1}}`)
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
