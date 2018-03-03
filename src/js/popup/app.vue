<template>
  <section class="container">
    <img class="setting-menu" src="../../img/setting.svg" @click="openEdit" />
    <div class="main-script">
      <div class="no-more-conatiner" v-if="!showScripts || !showScripts.length">
        no more
      </div>
      <div v-for="(item, index) in showScripts" :key="index" class="script-item">
        <span class="script-item__type">{{item.type}}</span>
        <code-tooltip :code="item.code">
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

// https://stackoverflow.com/questions/9515704/insert-code-into-the-page-context-using-a-content-script

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
      chrome.tabs.executeScript({
        code: `(function() {${script.code}})()`
      })
    },
    edit(script) {
      ext.tabs.create({'url': ext.extension.getURL('options.html') + `#editingId=${script.id}`})
    }
  }
}
</script>

<style>
.container {
  width: 400px;
  height: 400px;
  padding-top: 50px;
  overflow-y: auto;
}
.script-item {
  position: relative;
  margin-bottom: 16px;
  border-bottom: solid #ddd 1px;
  padding-bottom: 10px;
  font-size: 16px;
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
.no-more-conatiner {
  color: #666;
  font-size: 18px;
  text-align: center;
}
</style>


