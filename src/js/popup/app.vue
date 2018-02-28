<template>
  <section class="container">
    <img class="setting-menu" src="/setting.svg" @click="openEdit" />
    <div class="main-script">
      <div v-for="(item, index) in showScripts" :key="index" class="script-item">
        <span class="script-item__type">{{item.type}}</span>
        <code-tooltip>
          {{item.name}}
        </code-tooltip>
        <div class="script-item__action">
          <span @click="inject(item)" class="script-item__action-item">inject</span>
          <span @click="edit(item)"  class="script-item__action-item">edit</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { getAllScript } from '../curd'
import ext from '../util/ext'
import CodeTooltip from '../components/code-tooltip.vue'

export default {
  data() {
    return {
      scripts: []
    }
  },
  components: {
    CodeTooltip
  },
  mounted() {
    this.load()
  },
  computed: {
    showScripts() {
      return this.scripts
    }
  },
  methods: {
    openEdit() {
       ext.tabs.create({'url': ext.extension.getURL('options.html')})
    },
    load() {
      getAllScript().then(res => {
        console.log(res)
        this.scripts = res
      })
    },
    inject(script) {

    },
    edit(script) {

    }
  }
}
</script>

<style>
.container {
  width: 400px;
  height: 400px;
  padding-top: 50px;
}
.script-item {
  position: relative;
  margin-bottom: 16px;
  border-bottom: solid #ddd 1px;
  padding-bottom: 10px;
}
.script-item__action {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.script-item__type {
  background-color: #409eff;
  color: #fff;
  padding: 3px 6px;
  border-radius: 6px;
}
.script-item__action-item {
  cursor: pointer;
  color: #409eff;
  margin-right: 10px;
}
</style>


