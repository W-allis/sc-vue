const path = require('path')

const minicssextractplugin = require('mini-css-extract-plugin')

const config = require('../config')

const isProduction = process.env.BASE_ENV === 'production'


exports.resolve = function(_path) {
  const staticPath = isProduction ? config.build.staticPath : config.dev.staticPath

  return path.join(staticPath, _path)
}

exports.collection = function(options) {
  // options.usePostcss
  function generateLoader(loaders) {
    // if (typeof loaders === 'string') loaders = [loaders]
    
    const output = isProduction ? ['style-loader', 'css-loader'] : [minicssextractplugin.loader, 'css-loader']

    output.push(loaders + '-loader')

    if (options.usePostcss) output.push('postcss-loader')

    return output
  }

  return {
    css: generateLoader(),
    less: generateLoader('less'),
    sass: generateLoader('sass'),
    // must be sass
    scss: generateLoader('sass')
  }
}

exports.cssloaders = function(options) {
  const collections = exports.collection(options)
  const output = Object.keys(collections).map(loader => ({ test: new RegExp(`\\.${loader}$`), use: collections[loader] }))

  return output
}
