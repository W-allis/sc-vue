<template>
  <svg :class="IconClass">
    <use :xlink:href="IconName"></use>
  </svg>
</template>

<script>
  export default {
    data() {
      return { }
    },
    props: {
      iconClass: {
        type: String
      },
      iconName: {
        type: String,
        required: true
      }
    },
    created() {
    },
    computed: {
      IconName() {
        return '#icon-' + this.iconName
      },
      IconClass() {
        return this.iconClass ? 'icon ' + this.iconClass : 'icon'
      }
    }
  }
</script>

<style scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
