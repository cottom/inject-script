import '../css/options.css'
import Vue from 'vue'
import { Button, Select, Input, Option } from 'element-ui'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/icecoder.css'
import App from './options/app.vue'
import bus from './bus'

Vue.prototype.$bus = bus

Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
Vue.use(Option)

new Vue({
  render: h => h(App)
}).$mount('#app')
