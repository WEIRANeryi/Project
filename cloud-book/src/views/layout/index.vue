<template>
  <div>
    <router-view></router-view>
    <myTabBar page="index"></myTabBar>
  </div>
</template>

<script>
import myTabBar from '@/components/tab-bar'
export default {
  name: "layout",
  components: {
    myTabBar
  }
}
</script>

<style scoped>

</style>
