<template>
  <section>
    <header></header>
    <div class="filter">
      <el-select v-model="filterValue"></el-select>
      <el-button @click="addNew" type="primary">add</el-button>
    </div>
    <div v-if="newScript">
      <code-panel v-model="newScript.script"/>
    </div>
  </section>
</template>
<script>
import Vue from 'vue'
import { Button, Select } from 'element-ui'
import CodePanel from '../components/code-panel.vue'
Vue.use(Button)
Vue.use(Select)
export default {
  data() {
    return {
      filterValue: '',
      newScript: null
    }
  },
  components: {
    CodePanel
  },
  methods: {
    addNew() {
      this.newScript = {
        name: '',
        tag: null,
        script: ''
      }
    }
  }
}
</script>
