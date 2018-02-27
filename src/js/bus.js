import Vue from 'vue'
// import { getAllTypes, updateAllTypes, addTypes } from './curd'

export default new Vue({
  data() {
    return {
      types: []
    }
  },
  created() {
    getAllTypes().then(res => {
      this.types = res || []
    })
  },
  watch: {
    types(v) {
      console.log('---- HACK ALL TYPES CHANGES  ----')
      updateAllTypes(v)
    }
  }
})
