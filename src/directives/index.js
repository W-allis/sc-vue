import Vue from 'vue'

const requireAll = require.context('./', false, /\.directive\.js$/)

requireAll.keys().map(path => {
  const nameReg = /\.\/(.*)\.directive\.js$/
  Vue.directive(nameReg.exec(path)[1], requireAll(path).default)
  // console.log(path)
})
