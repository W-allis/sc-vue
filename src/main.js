import Vue from 'vue'
import App from './app'

import '@/styles/index.scss'
import router from '@/router'

import '@/vendor/jsonToExcel'

import _ from 'lodash'

console.log(_)

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />'
})

export default app
