import Vue from 'vue'

const requireAll = require.context('./', false, /\.directive\.js$/)

console.dir(requireAll.keys().map(requireAll))
requireAll.keys().map(requireAll).forEach(module => {
  // Vue.directive()
  // console.dir(module)
})

