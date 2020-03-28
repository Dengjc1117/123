<template>
  <div class="nav">
    <div @click="$router.back()">
      <span class="iconfont iconjiantou2"></span>
    </div>
    <strong>{{title}}</strong>
    <div @click="$router.push('/')" v-if="homeShow">
      <span class="iconfont iconshouye"></span>
    </div>
    <div v-else>
      <span class="iconfont iconshouye" style="opacity:0"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "homeShow"]
};
</script>

<style scoped lang="less">
.nav {
  display: flex;
  justify-content: space-between;
  padding: 15/360 * 100vw 25/360 * 100vw;
  background: #d3d2cd;
  .iconfont {
    font-size: 17px;
  }
}
</style>