<template>
  <div class="box">
    <div class="shut">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="form.username"
        name="用户名"
        placeholder="用户名 / 手机号码"
        :rules="[{ required: true, message: '请填写用户名/手机号码' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="btn">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div class="register">
      <router-link to="/register">注册账号</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log('submit', this.form);
      this.$axios({
        url: "/login",
        method: "post",
        data: this.form
      }).then(response => {
        let { data, message } = response.data;
        localStorage.setItem("userInfo", JSON.stringify(data));
        this.$toast.success(message);
        this.$router.push("/personal");
      });
    }
  }
};
</script>

<style scoped lang="less">
.box {
  padding: 20/360 * 100vw;
  .shut {
    .iconicon-test {
      font-size: 25/360 * 100vw;
    }
  }
  .logo {
    text-align: center;
    .iconnew {
      font-size: 120/360 * 100vw;
      color: #cc3300;
    }
  }
  .register {
    position: absolute;
    right: 30/360 * 100vw;
    color: #888;
    margin-top: 10/360 * 100vw;
  }
  .form {
    .van-cell {
      font-size: 16px;
      margin-top: 20/360 * 100vw;
      margin-bottom: 20/360 * 100vw;
      border-bottom: 1px #999 solid;
    }
    .btn {
      margin-top: 50/360 * 100vw;
      .van-button--info {
        background-color: #cc3300;
        border: 1px solid #cc3300;
      }
    }
  }
}
</style>