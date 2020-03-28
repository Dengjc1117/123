<template>
  <div class="box">
    <div class="nav">
      <div @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <strong>个人中心</strong>
      <div @click="$router.push('/')">
        <span class="iconfont iconshouye"></span>
      </div>
    </div>
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
    <Listber v-for="(item,index) in rows" :key="index" :label="item.label" :tips="item.tips"></Listber>
    <Listber label="退出" @click.native="exitClick"></Listber>
  </div>
</template>

<script>
//导入子组件
import Listber from "@/components/Listber.vue";
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
    Listber
  },
  methods: {
    exitClick: function() {
      this.$dialog
        .confirm({
          //   title: '提示',
          message: "确定要退出账号吗?"
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
  .nav {
    display: flex;
    justify-content: space-between;
    padding: 15/360 * 100vw 25/360 * 100vw;
    background: #d3d2cd;
    .iconfont {
      font-size: 17px;
    }
  }
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