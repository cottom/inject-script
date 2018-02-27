<template>
  <div class="container"><textarea ref="textarea"></textarea></div>
</template>
<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
export default {
  name: 'CodePanel',
  props: {
    value: String,
    lang: {
      type: String,
      default: 'javascript'
    },
    disabled: Boolean
  },
  data() {
    return {}
  },
  mounted() {
    const readyOnly = this.disabled ? true : false
    this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
      viewportMargin: Infinity,
      lineNumbers: true,
      theme: 'icecoder',
      mode: 'javascript',
      value: this.value,
      readyOnly
    })
    this.editor.on('change', this.handleChange)
  },
  beforeDestroy() {
    this.editor && this.editor.toTextArea()
  },
  destroyed() {
  },
  watch: {
    value(val) {
      val !== this.editor.getValue() && this.editor.setValue(val)
    },
    disabled(v) {
      this.editor.steOption('readyOnly', v)
    }
  },
  methods: {
    handleChange() {
      this.$emit('input', this.editor.getValue())
    }
  }
}
</script>

<style>
.container {
  font-size: 14px;
}
.container .CodeMirror {
  border: 1px solid #eee;
  height: auto;
  min-height: 200px;
}
</style>


