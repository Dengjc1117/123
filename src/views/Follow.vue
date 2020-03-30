<template>
  <div>
    <!-- 头部 -->
    <Navigate title="我的关注"></Navigate>
    <!-- 内容 -->
    <div class="follow" v-for="(item,index) in followList" :key="index">
      <div class="left">
        <img :src="$axios.defaults.baseURL + item.head_img" />
      </div>
      <div class="userText">
        <p>{{ item.nickname }}</p>
        <div>{{ moment(item.create_date).format('YYYY-MM-DD')}}</div>
      </div>
      <div class="cancelFollow" @click="cancelFollow(item.id,index)">取消关注</div>
    </div>
  </div>
</template>

<script>
//导入顶部导航组件
import Navigate from "@/components/Navigate.vue";
//导入日期组件
import moment from "moment";

export default {
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.token = userInfo.token;
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: userInfo.token
      }
    }).then(response => {
      this.followList = response.data.data;
      console.log(this.followList);
    });
  },
  data() {
    return {
      token: "",
      followList: [],
      moment
    };
  },
  components: {
    Navigate
  },
  methods: {
    cancelFollow(id, index) {
      console.log(id);
      this.$dialog
        .confirm({
          //   title: '提示',
          message: "确定取消关注吗?"
        })
        .then(() => {
          //点击确定 请求取消关注接口.
          this.$axios({
            url: "/user_unfollow/" + id,
            method: "get",
            headers: {
              Authorization: this.token
            }
          }).then(response => {
            //删除data对应数据.
            this.followList.splice(index, 1);
            //成功提示
            this.$toast.success("已取消");
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang="less">
.follow {
  display: flex;
  height: 50/360 * 100vw;
  padding: 20/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #ddd solid;
  img {
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    margin-right: 8px;
    border-radius: 50%;
  }
  .userText {
    flex: 1;
    p {
      font-size: 16/360 * 100vw;
    }
    div {
      font-size: 14/360 * 100vw;
      color: #bbb;
    }
  }
  .cancelFollow {
    width: 75/360 * 100vw;
    height: 30/360 * 100vw;
    text-align: center;
    font-size: 14/360 * 100vw;
    line-height: 30/360 * 100vw;
    background: #999;
    border-radius: 15px;
  }
}
</style>