var test = require('tape')
var css = require('./')

test(function (t) {
  var className = css({color: 'red'})
  t.equal(typeof className, 'string')

  t.equal(css.getCss(), '.' + className + '{color:red}')
  t.end()
})
