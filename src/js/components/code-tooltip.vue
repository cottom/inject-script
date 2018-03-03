<script>
import Popper from 'popper.js'
import Vue from 'vue'
import highlight from 'highlight.js'
import 'highlight.js/styles/dark.css'
import { debounce } from '../util/helper'

export default {
  props: {
    code: String
  },
  data() {
    const context = this
    return {
      popperInstance: null,
      codeDOM: null,
      codeVM: null,
      showPoper: false,
      setPopperState: debounce((v) => {
        context.showPoper = v
      }, 300)
    }
  },
  created() {
    this.codeVM = new Vue({
      data() {
        return {node: ''}
      },
      render() {
        return this.node
      },
      updated() {},
      methods: {
        updateCode() {
          console.log(this.$el)
          if (this.$el && this.$el.querySelector && this.$el.querySelector('code')) {
            const codeEl = this.$el.querySelector('code')
            highlight.highlightBlock(codeEl)
          }
        }
      },
      watch: {
        node: {
          immediate: true,
          handler() {
            console.log(this.node)
            this.updateCode()
          }
        }
      }
    }).$mount()
  },
  methods: {
    showTooltip() {
      if (!this.popperInstance) this.createPopper(this.code)
      const popperEl = this.$refs.popper
      popperEl.classList.remove('display-none')
      popperEl.classList.add('zero-opacity')
      requestAnimationFrame(() => {
        popperEl.classList.remove('zero-opacity')
        popperEl.classList.add('full-opacity')
      })
    },
    hiddenTooltip() {
      const popperEl = this.$refs.popper
      popperEl.classList.remove('full-opacity')
      popperEl.classList.add('zero-opacity')
      setTimeout(() => {
        popperEl.classList.remove('zero-opacity')
        popperEl.classList.add('display-none')
      }, 200)
    },
    createPopper(code) {
      const popperEl = this.$refs.popper
      popperEl.classList.add('display-none')
      document.body.appendChild(popperEl)
      this.popperInstance = new Popper(this.$el, popperEl)
    }
  },
  destroyed() {
    this.popperInstance && this.popperInstance.destroy()
  },
  render(h) {
    const { $slots } = this
    if (this.codeVM) {
      this.codeVM.node = h('div', {
        ref: 'popper',
        class: 'tooltip-main',
        on: {
          mouseover: () => this.setPopperState(true),
          mouseout: () => this.setPopperState(false)
        }
      }, [
        h('pre', {}, [
          h('code', {
            class: 'lang-js'
          }, [this.code])
        ])
      ])
    }
    return h('div', {
      class: 'tooltip-conatiner',
      on: {
        mouseover: () => this.setPopperState(true),
        mouseout: () => this.setPopperState(false)
      }
    }, $slots.default)
  },
  watch: {
    code: {
      // immediate: true,
      handler(value) {
        this.codeDOM = this.getRenderCodeDOM(value)
      }
    },
    showPoper(v) {
      const { showTooltip, hiddenTooltip } = this;
      v ? this.showTooltip() : this.hiddenTooltip()
    }
  }
}
</script>

<style>
.tooltip-conatiner {
  display: inline-block;
  cursor: pointer;
  position: relative;
}
.display-none {
  display: none;
}
.tooltip-main {
  transition: opacity 0.2s ease-in-out;
  max-width: 400px;
  max-height: 600px;
  overflow: auto;
  font-size: 14px;
}
.full-opacity {
  opacity: 1;
}
.zero-opacity {
  opacity: 0;
}
</style>

