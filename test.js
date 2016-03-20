var browserify = require('browserify')
var test = require('tape')
var path = require('path')
var bl = require('bl')
var fs = require('fs')

test('transform', function (t) {
  t.plan(2)
  var expected = fs.readFileSync(path.join(__dirname, 'fixture/expected.css'), 'utf8')

  browserify()
    .require('./fixture/source.js')
    .transform('./')
    .plugin('css-extract', {out: write})
    .bundle()

  function write () {
    return bl(function (err, buffer) {
      t.ifError(err, 'no error')
      t.equal(String(buffer).trim(), String(expected).trim())
    })
  }
})
