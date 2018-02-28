<template>
  <div class="tooltip-conatiner">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    code: String
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
.tooltip-conatiner {
  display: inline-block;
}
</style>

