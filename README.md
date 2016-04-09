# stylin [![Build Status](https://travis-ci.org/ajoslin/stylin.svg?branch=master)](https://travis-ci.org/ajoslin/stylin)

Convert a style object into css and insert it into the DOM at runtime.

- Works in Node or the browser
- Recommended for use with virtual-dom
- Will never generate the same styles twice
- Supports pseudo-selectors, but *not* fonts or media queries
- Allows you to generate styles at runtime
  - Most tools only generate CSS at compile or app-bootstrap time.

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
    ':hover': {
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

**style**: object (required)

Returns a string className for the given style.

Any pseudo selector (begins with `:`) keys of `style` can be sub-objects containing pseudo-styles for the element (see the above example).

## License

MIT © [Andrew Joslin](http://ajoslin.com)
