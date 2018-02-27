<template>
  <section>
    <header></header>
    <div class="filter" filterable>
      <el-select placeholder="type filter" filterable v-model="filterValue">
        <el-option v-for="(item, index) in $bus.types" :key="index" :value="item" :label="item"></el-option>
      </el-select>
      <el-button @click="addNew" type="primary" v-if="!newScript">add</el-button>
    </div>
    <div v-for="(item, index) in scripts" :key="index">
      <editor-item
        :mode="editingId===item.id"
        :config="item"
        @delete="deleteItem(item.id)"
        @open-edit="openEditing(item.id)"
        ></editor-item>
    </div>
    <div v-if="newScript">
      <editor-item :config="newScript" @cancel="newScript=null" @confirm="saveNewScript"/>
    </div>
  </section>
</template>
<script>
import Vue from 'vue'
import EditorItem from '../components/editor-item.vue'
import { saveScript, updateScript, deleteScript, getAllScript, getScriptById } from '../curd'
export default {
  data() {
    return {
      // bus,
      filterValue: '',
      newScript: null,
      scripts: [],
      editingId: -1
    }
  },
  components: {
    EditorItem
  },
  methods: {
    load() {
      getAllScript().then(res => (this.scripts = res))
    },
    resetEditing() {
      this.editingId = -1;
    },
    resetAndReload() {
      this.resetEditing()
      this.load()
    },
    deleteItem(id) {
      deleteScript(id).then(this.resetAndReload)
    },
    openEditing(id) {
      if (!~this.editingId) this.editingId = id
      // else
    },
    addNew() {
      this.newScript = {
        name: '',
        type: null,
        code: ''
      }
    },
    saveNewScript(script) {
      const { type } = script
      if (!this.$bus.types.includes(type)) this.$bus.types.push(type)
      saveScript(script).then(() => {
        this.newScript = null
        this.load()
      })
    }
  }
}
</script>
