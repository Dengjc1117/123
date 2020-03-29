<template>
  <div class="box">
    <Navigate title="个人中心" :homeShow="true"></Navigate>
    <router-link to="/editor">
      <div class="head">
        <div class="avatar">
          <img :src="$axios.defaults.baseURL + userInfo.head_img" />
        </div>
        <div class="userText">
          <p>{{userInfo.nickname}}</p>
          <span>{{moment(userInfo.create_date).format('YYYY-MM-DD')}}</span>
        </div>
        <div class="iconfont iconjiantou1"></div>
      </div>
    </router-link>
    <Listber v-for="(item,index) in rows" :key="index" :label="item.label" :tips="item.tips"></Listber>
    <Listber label="退出" @click.native="exitClick"></Listber>
  </div>
</template>

<script>
//导入 列表 子组件
import Listber from "@/components/Listber.vue";
//导入顶部导航 子组件
import Navigate from "@/components/Navigate.vue";
//导入日期插件
import moment from "moment";
export default {
  //组件加载完触发
  mounted() {
    let { token, user } = JSON.parse(localStorage.getItem("userInfo"));
    //axios请求
    this.$axios({
      url: "/user/" + user.id,
      headers: {
        Authorization: token
      }
    }).then(response => {
      //axios请求成功后 将数据保存到userInfo
      this.userInfo = response.data.data;
    });
  },

  data() {
    return {
      rows: [
        { label: "我的关注", tips: "关注的用户" },
        { label: "我的跟帖", tips: "跟帖 / 回复" },
        { label: "我的收藏", tips: "文章 / 视频" }
      ],
      userInfo: {},
      moment
    };
  },
  //注册组件
  components: {
    Listber,
    Navigate
  },
  methods: {
    exitClick: function() {
      this.$dialog
        .confirm({
          //   title: '提示',
          message: "确定要退出吗?"
        })
        .then(() => {
          localStorage.removeItem("userInfo");
          this.$router.replace("/login");
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang="less" >
.box {
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 25 /360 * 100vw;
    .avatar {
      img {
        width: 70/360 * 100vw;
        height: 70/360 * 100vw;
        margin-right: 5px;
        border-radius: 50%;
      }
    }
    .userText {
      flex: 1;
      p {
        font-size: 16px;
      }
      span {
        font-size: 16px;
        color: #888;
      }
    }
  }
}
</style>