<template>
  <router-link class="list" :to="path || '#'">
    <div class="left">{{label }}</div>
    <div class="right">
      <span>{{tips}}</span>
      <span class="iconfont iconjiantou1"></span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["label", "tips", "path"]
};
</script>

<style lang="less">
.list {
  display: flex;
  justify-content: space-between;
  height: 45/360 * 100vw;
  line-height: 45/360 * 100vw;
  border-bottom: 1px #ddd solid;
  margin-left: 25 /360 * 100vw;
  padding-right: 25 /360 * 100vw;
  .left {
    font-size: 17/360 * 100vw;
  }
  .right {
    span {
      font-size: 14/360 * 100vw;
      color: #aaa;
    }
    .iconjiantou1 {
      font-size: 17/360 * 100vw;
    }
  }
}
</style>