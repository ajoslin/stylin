# stylin [![Build Status](https://travis-ci.org/ajoslin/stylin.svg?branch=master)](https://travis-ci.org/ajoslin/stylin)

Javascript to CSS: Convert a style object into css and insert it into the DOM at runtime.

This library is a convenience wrapper around [free-style](https://github.com/blakeembrey/free-style) that provides auto-prefixing and an easier API.

Total size is less than 6KB gzipped.

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

All styles are set to `!important` by default, to avoid the pains of style-priority.

#### `stylin(styles...) -> className`

Returns a string className for the given style objects extended together.

Passes a prefixed style object to [FreeStyle#registerStyle](https://github.com/blakeembrey/free-style#styles).

#### `stylin.unimporant(styles...)` -> className`

Returns a string className for the given style objects extended together. Same as the the main `stylin` method above, except does *not* mark the styles as `!important`.

This is good to use with elements who will have styles added to them by third-party libraries.

#### `stylin.rule(key, styles...) -> undefined`

Creates a global rule from the given styles extended together. Use it for font-faces and the like.

Passes a prefixed rule object to [FreeStyle#registerRule](https://github.com/blakeembrey/free-style#rules).

Example:

```js
var css = require('stylin')
css.rule('@font-face', {
  fontFamily: '"Bitstream Vera Serif Bold"',
  src: 'url(https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf)'
})
```

#### `stylin.keyframes(styles...) -> animationName`

Returns a string animationName for the given keyframe definitions extended together.

Passes a prefixed keyframe object to [FreeStyle#registerKeyframes](https://github.com/blakeembrey/free-style#keyframes).

Example:

```js
var css = require('stylin')
var animationName = css.keyframes({
  from: {opacity: 0},
  to: {opacity: 1}
})
```

#### `stylin.getCss() -> cssString`

Returns a string of all styles generated. Intended for use in server-side rendering.

## License

MIT © [Andrew Joslin](http://ajoslin.com)

MIT © [Blake Embrey](http://blakeembrey.me), [free-style](https://github.com/blakeembrey/free-style)
