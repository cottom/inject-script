<template>
  <section>
    <header class="header">
      Inject-Script
    </header>
    <article class="main-body">
      <div class="filter">
        <el-select placeholder="type filter" filterable clearable v-model="filterType">
          <el-option v-for="(item, index) in $bus.types" :key="index" :value="item" :label="item"></el-option>
        </el-select>
        <el-input type="script" placeholder="name" v-model="filterName" clearable class="filter-input"></el-input>
        <el-button @click="addNew" type="primary" v-if="!newScript" class="new-script-btn">add</el-button>
      </div>
      <div v-if="newScript" class="new-script__container">
        <editor-item :config="newScript" mod="edit" @cancel="newScript=null" @confirm="saveNewScript"/>
      </div>
      <div v-for="(item, index) in showScripts" :key="index + item.id">
        <editor-item
          :mod="editingId===item.id ? 'edit' : 'view'"
          :config="item"
          @delete="deleteItem(item)"
          @cancel="cancelEditing"
          @open-edit="openEditing(item.id)"
           @confirm="update"
          ></editor-item>
      </div>
    </article>
  </section>
</template>
<script>
import Vue from 'vue'
import EditorItem from '../components/editor-item.vue'
import { saveScript, updateScript, deleteScript, getAllScript, getScriptById } from '../curd'
import { MessageBox } from 'element-ui'

export default {
  data() {
    return {
      // bus,
      filterType: '',
      filterName: '',
      newScript: null,
      scripts: [],
      editingId: -1
    }
  },
  components: {
    EditorItem
  },
  async created() {
    await this.load()
    const hash = location.hash.replace('#', '')
    if (!hash) return
    const query = hash.split('&').filter(i => !!i).map(i => i.split('=')).reduce((p, c) => (p[c[0]] = c[1] || '', p), {})
    console.log(query)
    if (query.editingId) this.editingId = query.editingId
  },
  computed: {
    showScripts() {
      return this.scripts.filter(i => {
        const { filterType, filterName } = this;
        if (filterType && i.type !== filterType)  return false
        if (filterName && !i.name.includes(filterName)) return false
        return true
      })
    }
  },
  methods: {
    load() {
      return getAllScript().then(res => {
        this.scripts = res
        console.log(res)
      })
    },
    resetEditing() {
      this.editingId = -1;
    },
    resetAndReload() {
      this.resetEditing()
      this.load()
    },
    deleteItem(item) {
      console.log('delete item')
      MessageBox.confirm(`是否删除脚本${item.name}?`, '提示').then(() => deleteScript(item.id).then(this.resetAndReload))
    },
    openEditing(id) {
      this.editingId = id
    },
    update(script, isChanged) {
      console.log(isChanged)
      if (!isChanged) return (this.editingId = -1)
      updateScript(script).then((scripts) => {
        this.scripts = scripts
        this.editingId = -1
      })
    },
    cancelEditing() {
      this.editingId = -1;
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
      saveScript(script).then((scripts) => {
        this.newScript = null
        // this.scripts = scripts
        this.load()
      })
    }
  }
}
</script>
<style>
.filter {
  position: relative;
  margin-bottom: 16px;
}
.new-script-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.filter-input {
  width: 200px;
}

.header {
  height: 60px;
  line-height: 60px;
  background: #409EFF;
  color: #fff;
  padding-left: 40px;
  font-size: 20px;
  margin-bottom: 20px;
}

.main-body {
  padding: 30px 40px;
}
.new-script__container {
  margin-bottom: 20px;
}
* {
  margin: 0;
  padding: 0;
}

</style>

