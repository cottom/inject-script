import '../css/options.css'
import Vue from 'vue'
import { Button, Select, Input } from 'element-ui'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/icecoder.css'
import App from './options/app.vue'

Vue.use(Button)
Vue.use(Select)
Vue.use(Input)
new Vue({
  render: h => h(App)
}).$mount('#app')
