<script>
export default {
  created() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const component = this;
    this.handler = function (e) {
      component.$emit('keyup', e);
    }
    window.addEventListener('keyup', this.handler);
  },
  beforeUnmount() {
    window.removeEventListener('keyup', this.handler);
  }
}
</script>

<template>
  <div></div>
</template>

<style scoped lang="scss">
div {
  display: none;
}
</style>