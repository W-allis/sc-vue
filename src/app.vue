<template>
  <div>
    <router-view></router-view>
    <span>测试</span>
    <img src="@/assets/img/detail.png" alt="">
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  span {
    color: $primary;
    font-size: $defaultSize;
  }

  div {
    height: 200px;
    border: 1px solid #666;
  }

  p {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
