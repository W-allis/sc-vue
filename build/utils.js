const path = require('path')

const minicssextractplugin = require('mini-css-extract-plugin')

const config = require('../config')

const isProduction = process.env.BASE_ENV === 'production'


exports.resolve = function(_path) {
  const staticPath = isProduction ? config.build.staticPath : config.dev.staticPath

  return path.join(staticPath, _path)
}

exports.collection = function(options) {
  const data = isProduction ? `$primary: red; $defaultSize: 16px;` :  `$primary: green; $defaultSize: 32px;`
  // options.usePostcss
  function generateLoader(loaders, loaderoptions) {
    // if (typeof loaders === 'string') loaders = [loaders]
    // 舍弃 vue-style-loader，在非production下无法分离css， 另一个办法是将打包和运行环境分开，打包的时候使用minicissextractplugin。运行使用 vue-style-loader，这里不做处理
    // const output = isProduction ? [minicssextractplugin.loader, 'css-loader'] : [minicssextractplugin.loader, 'css-loader']
    const output = isProduction ? [minicssextractplugin.loader, 'css-loader'] : ['style-loader', 'css-loader']

    // sourmap，将css压缩之后，对应sourmap找到对应的错误行数，真正的css节省了体积
    loaders && (output.push({
      loader: loaders + '-loader',
      options: Object.assign({ }, loaderoptions, { sourceMap: options.sourceMap })
    }))

    if (options.usePostcss) output.push('postcss-loader')

    return output
  }

  return {
    css: generateLoader(),
    less: generateLoader('less'),
    // data；设置 css的全局变量
    // must be sass indentedSyctax sassloader 不会处理不缩进的scss文件
    sass: generateLoader('sass', { indentedSyntax: true }),
    scss: generateLoader('sass', { data })
  }
}

exports.cssloaders = function(options) {
  const collections = exports.collection(options)
  const output = Object.keys(collections).map(loader => ({ test: new RegExp(`\\.${loader}$`), use: collections[loader] }))

  return output
}
