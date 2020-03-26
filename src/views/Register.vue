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
        placeholder="用户名 /手机号码"
        :rules="[{ required: true, message: '请填写用户名/手机号码' }]"
      />

      <van-field
        v-model="form.nickname"
        name="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />

      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="btn">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        nickname: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log('submit', this.form);
      this.$axios({
        url: "/register",
        method: "POST",
        data: this.form
      }).then(response => {
        console.log(response);
      });
    }
  }
};
</script>

<style lang="less">
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