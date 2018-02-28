import ext from './util/ext'
import '../css/popup.css'
import Vue from 'vue'
import Popup from './popup/app.vue'
new Vue({
  render: h => h(Popup)
}).$mount('#app')
