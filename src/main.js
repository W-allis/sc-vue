import Vue from 'vue'
import App from './app'

// 该项目css文件
import '@/styles/index.scss'
import router from '@/router'

// 自定义指令
import '@/directives'

// 自定义通道符，去中心化
import * as filters from '@/filters'

console.dir(Vue)
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
// let y, o, n, m, k, l, p, w, b
// let a = (_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["BS","TAB","CAPS","ENTER"][p++]||'SHIFT',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join``)()
Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />'
})

