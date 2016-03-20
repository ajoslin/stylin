var sass = require('node-sass')
var postcss = require('postcss')
var merge = require('deep-extend')
var path = require('path')
var extend = require('xtend')
var resolve = require('resolve')
var through = require('through2')

var PassThrough = require('readable-stream').PassThrough

var defaults = {
  sass: {
    sourceComments: false,
    sourceMap: false,
    sourceMapEmbed: false,
    sourceMapContents: false,
    outputStyle: 'compressed'
  },
  postcss: false,
  rootDir: process.cwd()
}

module.exports = function stylin (file, options) {
  var ext = path.extname(file)
  if (!/\.(css|sass|scss)/.test(ext)) return new PassThrough()

  options = merge({}, defaults, options)

  var postcssTransforms
  if (options.postcss) {
    if (typeof options.postcss !== 'object') {
      throw new Error('postcss config must be false or an object!')
    }
    postcssTransforms = getPostcssTransforms(options.postcss)
  }

  var content = ''
  return through.obj(write, flush)

  function write (chunk, enc, next) {
    content += chunk.toString()
    next()
  }

  function flush (done) {
    var sassOptions = extend({
      includePaths: [],
      indentedSyntax: /\.sass$/i.test(file),
      file: file,
      data: content,
      outFile: file
    }, options.sass)

    sassOptions.includePaths.unshift(path.dirname(file))

    var result = sass.renderSync(sassOptions).css.toString()
    var css = options.postcss
      ? postcss(postcssTransforms).process(result).css
      : result

    this.push('require(\'insert-css\')(' + JSON.stringify(css) + ');')
    done()
  }
}

function getPostcssTransforms (options) {
  // Options is for example {autoprefixer: {}}
  return Object.keys(options).map(function (key) {
    var plugin = require(resolve.sync(key, {basedir: process.cwd()}))

    return plugin(options[key] || {})
  })
}
