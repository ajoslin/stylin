var test = require('tape')
var stylin = require('./')
var formatStyles = require('./src/format')

test('formatStyles', function (t) {
  t.test('puts styles into selector', function (t) {
    var formatted = formatStyles('.selector', {color: 'red'})
    t.deepEqual(formatted, {
      '.selector': {color: 'red'}
    })
    t.end()
  })

  t.test('puts pseudo selectors into separate selector', function (t) {
    var formatted = formatStyles('.sel', {
      ':pseudo': {
        userSelect: 'bar'
      },
      'not-pseudo': {
        bar: 'baz'
      }
    })
    t.deepEqual(formatted, {
      '.sel:pseudo': {
        '-moz-user-select': 'bar',
        '-ms-user-select': 'bar',
        '-o-user-select': 'bar',
        '-webkit-user-select': 'bar',
        'user-select': 'bar'
      },
      '.sel': {
        // This won't actually compile to proper css
        'not-pseudo': {
          bar: 'baz'
        }
      }
    })
    t.end()
  })

  t.test('converts camelCase to dashCase', function (t) {
    var formatted = formatStyles('.sel', {
      camelKey: {foo: 'bar'}
    })
    t.deepEqual(formatted, {
      '.sel': {
        'camel-key': {foo: 'bar'}
      }
    })
    t.end()
  })

  t.test('prefixes', function (t) {
    var formatted = formatStyles('sel', {
      transition: '1s'
    })
    t.deepEqual(formatted, {
      sel: {
        '-moz-transition': '1s',
        '-ms-transition': '1s',
        '-o-transition': '1s',
        '-webkit-transition': '1s',
        transition: '1s'
      }
    })
    t.end()
  })
})

test('stylin', function (t) {
  t.test('className is the same for equivalent objects', function (t) {
    t.equal(
      stylin({foo: 'bar'}),
      stylin({foo: 'bar'})
    )
    t.end()
  })

  t.test('className is different', function (t) {
    t.notEqual(
      stylin({foo: 'bar'}),
      stylin({bar: 'baz'})
    )
    t.end()
  })
})
