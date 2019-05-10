import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import.' + process.env.enviroment)

Vue.use(Router)

const routes = []

const router = new Router({
  mode: 'hash',
  routes
})

export default router
