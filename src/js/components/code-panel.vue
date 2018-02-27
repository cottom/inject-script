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
    }
  },
  data() {
    return {
      xx: 'xx'
    }
  },
  mounted() {
    this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      theme: 'icecoder',
      mode: 'javascript',
      value: this.value
    });
    this.editor.on('change', this.handleChange)
  },
  beforeDestroy() {
    this.editor && this.editor.toTextArea()
  },
  destroyed() {
  },
  watch: {
    value(v) {
      val !== this.editor.getValue() && this.editor.setValue(val)
    }
  },
  methods: {
    handleChange() {
      this.$emit('change', this.editor.getValue())
    }
  }
}
</script>

<style>
.container {
  font-size: 14px;
}
</style>


