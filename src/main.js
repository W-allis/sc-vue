import Vue from 'vue'
import App from './app'

// 该项目css文件
import '@/styles/index.scss'
import router from '@/router'

// 自定义指令
import '@/directives'

// 自定义通道符，去中心化
import * as filters from '@/filters'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 自定义组件，因为可能涉及到一些this.toast类的自定义组件不需要，暂时通过中心化注册到全局组件中
import components from '@/components'
Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

// 使用svg图标
import '@/icons'
// import '@/vendor/jsonToExcel'

// import _ from 'lodash'

// console.log(_)

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />'
})

export default app
