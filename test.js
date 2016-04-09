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
        foo: 'bar'
      },
      'not-pseudo': {
        bar: 'baz'
      }
    })
    t.deepEqual(formatted, {
      '.sel:pseudo': {foo: 'bar'},
      '.sel': {
        // This won't actually compile to proper css
        'not-pseudo': {
          bar: 'baz'
        }
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
        WebkitTransition: '1s',
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
