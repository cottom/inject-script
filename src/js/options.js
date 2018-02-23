import '../css/options.css'
import Vue from 'vue'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/icecoder.css'
import App from './options/app.vue'

new Vue({
  render: h => h(App)
}).$mount('#app')
