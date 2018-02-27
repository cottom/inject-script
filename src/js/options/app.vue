<template>
  <section>
    <header></header>
    <div class="filter" filterable>
      <el-select placeholder="searchByType" v-model="filterValue">
      </el-select>
      <el-button @click="addNew" type="primary">add</el-button>
    </div>
    <div v-if="newScript">
      <editor-item :config="newScript" />
    </div>
  </section>
</template>
<script>
import Vue from 'vue'
import { Button, Select } from 'element-ui'
import EditorItem from '../components/editor-item.vue'

// import bus from '../bus'

import { saveScript, updateScript, deleteScript, getAllScript, getScriptById } from '../curd'

Vue.use(Button)
Vue.use(Select)
export default {
  data() {
    return {
      // bus,
      filterValue: '',
      newScript: null
    }
  },
  components: {
    EditorItem
  },
  methods: {
    addNew() {
      this.newScript = {
        name: '',
        type: null,
        code: ''
      }
    }
  }
}
</script>
