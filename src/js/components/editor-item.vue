<template>
  <section class="container">
    <header class="container__header">
      <div>
        <el-input v-model="editingCode.name" placeholder="name" class="container__header__input" />
        <el-select
          v-model="editingCode.type"
          filterable
          allow-create
          placeholder="type"
          ></el-select>
      </div>
      <div class="exectue-area">
        <el-button type="danger">cancel</el-button>
        <el-button type="primary">save</el-button>
      </div>
    </header>
    <code-panel></code-panel>
  </section>
</template>

<script>
import CodePanel from './code-panel.vue'

export default {
  name: 'EditorItem',
  components: {
    CodePanel
  },
  props: {
    mod: {
      type: String,
      default: 'view'
    },
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editingCode: {...this.config}
    }
  },
  computed: {
    isChanged() {
      const { config, editingCode } = this
      return !(config.code === editingCode.code && config.name === editingCode.name && config.type === editingCode.type)
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm', this.editingCode, this.isChanged)
    }
  }
}
</script>


<style scoped>
.container {
  position: relative;
}

.container__header {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
.container__header__input {
  width: 200px;
}
.exectue-area {
  text-align: right;
}
</style>

