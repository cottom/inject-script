<template>
  <div :class="`container ${disabled ? '' : 'min-height'}`">
    <textarea ref="textarea" :value="value"></textarea>
  </div>
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
    const readOnly = this.disabled ? true : false
    this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
      viewportMargin: Infinity,
      lineNumbers: true,
      theme: 'icecoder',
      mode: 'javascript',
      value: this.value,
      readOnly
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
      this.editor.setOption('readOnly', v)
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
}
.min-height .CodeMirror  {
  min-height: 200px;
}
</style>


