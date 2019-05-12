import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import.' + process.env.enviroment)

Vue.use(Router)

const routes = [
  // name值为router跳转name，icon为路由图标（暂时无用），meta(title 与多语言相关，暂时无用，cache路由缓存，暂时无用), hidden隐藏该路由信息，暂时无用
  { path: '/user', component: _import('userPlatform/index'), name: 'user', icon: 'user', meta: { title: 'user', cache: true, hidden: false }}
]

const router = new Router({
  mode: 'hash',
  routes
})

export default router
