import Vue from 'vue'
import { getAllTypes } from './curd'

export default new Vue({
  data() {
    return {
      types: []
    }
  },
  created() {
    this.$on('updateTypes', (types) => {
      this.types = types
    })
    getAllTypes().then(res => this.types = res)
  },
  watch: {
    types(v) {
      console.log('---- global types changed ----')
    }
  }
})
