# stylin [![Build Status](https://travis-ci.org/ajoslin/stylin.svg?branch=master)](https://travis-ci.org/ajoslin/stylin)

> stylin on 'em

Configurable browserify transform that compiles [sass](http://sass-lang.com), runs it through postcss, and injects it into the browser with [insert-css](https://github.com/substack/insert-css).

Based on [chrishoage/scssify](https://github.com/chrishoage/scssify).

```
npm install --save-dev stylin
```

Note: If you're starting a new project, [sheetify](https://github.com/stackcss/sheetify), [sheetify-sass](https://github.com/stackcss/sheetify-sass) and [sheetify-cssnext](https://github.com/stackcss/sheetify-cssnext) are the best way to style with browserify.

This tool is best used in an existing project that relies on the global nature of css classes and `require('./file.scss')`.

### Usage

##### Insert styles inline

```sh
browserify entry.js -t stylin
```

This will create [insert-css](https://github.com/substack/insert-css) statements in your code. If you use this method, you must `npm install --save insert-css` in your application.

##### Extract styles to bundle with [css-extract](https://github.com/stackcss/css-extract)

```sh
browserify entry.js -t stylin -p [ css-extract -o bundle.css ]
```

##### Set sass and postcss options in package.json

```json
{
  "browserify": {
    "transform": [
      [
        "stylin",
        {
          "sass": {
            "includePaths": ["src/my-variables"]
          },
          "postcss": {
            "autoprefixer": {
              "browsers": ["last 2 versions"]
            }
          }
        }
      ]
    ]
  }
}
```

### API

The default options are listed below. They may be overridden.

In order for PostCSS plugins to be used, they must be installed separately.

##### Options

###### `options.sass`

Options to be passed to the sass compiler. Default value:

```js
{ //Full sass options
  sourceComments: false,
  sourceMap: false,
  sourceMapEmbed: false,
  sourceMapContents: false,
  outputStyle: 'compressed'
}
```

###### `options.postcss`

If given, must be an object
```js
{
  postcss: {
    autoprefixer: {browsers: ['last 2 versions']}
  }
}
```

## License

MIT © [Andrew Joslin](http://ajoslin.com)
