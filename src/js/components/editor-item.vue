<template>
  <section class="container">
    <header class="view__header" v-if="mod==='view'">
      <span class="view__header-type">{{config.type}}</span>
      <span>
        {{config.name}}
      </span>
      <div class="view__header-right">
        <i class="edit-icon el-icon-edit" @click="openEdit"></i>
        <i class="edit-icon el-icon-delete" @click="deletItem"></i>
      </div>
    </header>
    <header class="container__header" v-if="mod==='edit'">
      <div>
        <el-input v-model="editingCode.name" placeholder="name" class="container__header__input" />
        <el-select
          v-model="editingCode.type"
          filterable
          allow-create
          placeholder="type"
          >
          <el-option v-for="(item, index) in $bus.types" :key="index" :value="item" :label="item"></el-option>
          </el-select>
      </div>
      <div class="exectue-area">
        <el-button round type="warning" @click="cancel">cancel</el-button>
        <el-button round type="primary" @click="confirm" :disabled="!editingCode.code || !editingCode.name">save</el-button>
      </div>
    </header>
    <code-panel v-model="editingCode.code" :disabled="mod==='view'"></code-panel>
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
      default: 'edit'
    },
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isView: false,
      editingCode: {...this.config}
    }
  },
  computed: {
    isChanged() {
      const { config, editingCode } = this
      return !(config.code === editingCode.code && config.name === editingCode.name && config.type === editingCode.type)
    },
    shouldInView() {
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm', this.editingCode, this.isChanged)
    },
    openEdit() {
      this.$emit('open-edit')
    },
    deletItem() {
      this.$emit('delete')
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
  z-index: 9;
}
.container__header__input {
  width: 180px;
}
.exectue-area {
  text-align: right;
}
.view__header {
  height: 60px;
  line-height: 60px;
  position: relative;
}
.view__header-right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.view__header-type {
  display: inline-block;
  color: #fff;
  background-color: #409eff;
  padding: 4px 8px;
  line-height: 1;
  border-radius: 16px;
  margin-right: 10px;
}

.edit-icon {
  cursor: pointer;
  margin-right: 10px;
  font-size: 20px;
}
</style>

