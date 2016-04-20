# stylin [![Build Status](https://travis-ci.org/ajoslin/stylin.svg?branch=master)](https://travis-ci.org/ajoslin/stylin)

Javascript to CSS: Convert a style object into css and insert it into the DOM at runtime.

This library is a convenience wrapper around [free-style](https://github.com/blakeembrey/free-style) that provides auto-prefixing and an easier API.

Total size is 6.33kB gzipped.

```
npm install --save stylin
```

### Example

```js
var css = require('stylin')
var h = require('virtual-dom/h')

function render (color) {
  var style = {
    color: color,
    '&:hover': {
      backgroundColor: color
    }
  }
  return h('div', {className: css(style)})
}

render('red') // generates new stylesheet and className
render('red') // re-uses stylesheet and className
render('blue') // generates new stylesheet and className
```

### API

#### `stylin(style) -> className`

Returns a string className for the given style.

Passes a prefixed style object to [FreeStyle#registerStyle](https://github.com/blakeembrey/free-style#styles).

#### `stylin.rule(key, style) -> className`

Returns a string className for the given rule. Use it for font-faces at the like.

Passes a prefixed rule object to [FreeStyle#registerRule](https://github.com/blakeembrey/free-style#rules).

Example:

```js
var css = require('stylin')
var className = css.rule('@font-face', {
  fontFamily: '"Bitstream Vera Serif Bold"',
  src: 'url(https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf)'
})
```

#### `stylin.keyframes(style) -> className`

Returns a string className for the given keyframe definition.

Passes a prefixed keyframe object to [FreeStyle#registerKeyframes](https://github.com/blakeembrey/free-style#keyframes).

Example:

```js
var css = require('stylin')
var className = css.keyframes({
  from: {opacity: 0},
  to: {opacity: 1}
})
```

## License

MIT © [Andrew Joslin](http://ajoslin.com)

MIT © [Blake Embrey](http://blakeembrey.me), [free-style](https://github.com/blakeembrey/free-style)
