const path = require('path')

module.exports = {
  dev: {
    publicPath: '',
    staticPath: '/assets',
    targetPath: path.resolve(__dirname, '../dist'),

    useEslint: true,

    proxyTable: {
      '/api': {
        target: 'http://192.168.38.15:9905',
        changeOringin: true,
        pathReWrite: {
          '^/api': ''   
        }
      }
    }
  }, 
  build: {
    publicPath: '',
    staticPath: '/assets',
    targetPath: path.resolve(__dirname, '../dist'),
    analyzer: true,
    gzipCompression: true
  }
}