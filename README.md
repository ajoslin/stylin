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

stylin **will mutate passed in style objects** to add browser prefixes and `!important` the first time they are passed in. We mutate objects for two performance increases:

- We only need to add prefixes and `!important` once per style object
- We don't thrash the garbage collector with a deluge of new objects

### `stylin(style, [styleOptions]) -> className`

Returns a string className for the given style object. All style values will be marked as `!important`. Use `stylin.unimportant` when this is not wanted.

##### style

*Type*: Object (*required*)

An object of style key/value pairs, which will be prefixed and passed to [FreeStyle#registerStyle](https://github.com/blakeembrey/free-style#styles).

##### styleOptions

*Type*: Object

###### styleOptions.styleId

If passed in, use a FreeStyle instance and stylesheet matching `styleId` for these styles. By default, all styles are shared between one FreeStyle instance and `<style>` tag using `stylin.STYLE_ID`.

### `stylin.unimportant(style, [styleOptions])` -> className`

Returns a string className for the given style object. This the same as the the main `stylin` method above, except it does *not* mark style values as `!important`.

This is good to use with elements who will have styles added to them by third-party libraries, so as not to override those styles.

### `stylin.rule(key, style, [styleOptions]) -> undefined`

Creates a global rule from the given styles extended together. Use it for font-faces and other global rules.

Passes a prefixed rule object to [FreeStyle#registerRule](https://github.com/blakeembrey/free-style#rules).

See `stylin()` method above for documentation of `styleOptions`.

Example:

```js
var css = require('stylin')
css.rule('@font-face', {
  fontFamily: '"Bitstream Vera Serif Bold"',
  src: 'url(https://mdn.mozillademos.org/files/2468/VeraSeBd.ttf)'
})
```

#### `stylin.keyframes(style, [styleOptions]) -> animationName`

Returns a string animationName for the given keyframe definition.

Passes a prefixed keyframe object to [FreeStyle#registerKeyframes](https://github.com/blakeembrey/free-style#keyframes).

See `stylin()` method above for documentation of `styleOptions`.

Example:

```js
var css = require('stylin')
var animationName = css.keyframes({
  from: {opacity: 0},
  to: {opacity: 1}
})
```

#### `stylin.getCss([styleId]) -> cssString`

`styleId` defaults to `stylin.STYLE_ID`.

Returns a string of all styles generated. Intended for use in server-side rendering.

#### `stylin.STYLE_ID`

This is the string ID of the `<style>` element that styles will be placed into by default.

For server side rendering, send the following to the client, and the client will find the existing styles in the style tag and merge them:

```js
var stylin = require('stylin')
function serverRenderApp () {
  var appHtml = renderMyApp()
  return `
    <html>
    <head>
      <style id="${stylin.STYLE_ID}">${stylin.getCss()}</style>
    </head>
    ... everything else ...
  `
}
```

## License

MIT © [Andrew Joslin](http://ajoslin.com)

MIT © [Blake Embrey](http://blakeembrey.me), [free-style](https://github.com/blakeembrey/free-style)
