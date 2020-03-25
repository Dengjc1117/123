<template>
  <div class="box">
    <div class="head"></div>
    <div class="iconfont iconicon-test shut"></div>
    <div class="iconfont iconnew logo"></div>
    <div class="form">
      <div>
        <input type="text" class="username" placeholder="用户名/手机号码" />
      </div>
      <div>
        <input type="text" class="password" placeholder="密码" />
      </div>
      <div class="btn">登录</div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.box {
  position: relative;
  width: 360px;
  height: 682px;
  background: #f2f2f2;
  .head {
    width: 360px;
    height: 25px;
    background: #757575;
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 360px;
    height: 45px;
    background: #000;
  }
  .shut {
    margin: 25px;
    font-size: 25px;
  }
  .logo {
    padding-left: 130px;
    font-size: 120px;
    color: red;
  }

  .form {
    align-content: center;
    .username,
    .password {
      height: 40px;
      width: 300px;
      margin: 5px 25px;
      outline-style: none;
      border: none;
      border-bottom: #999 1px solid;
      background: #f2f2f2;
    }
    .btn {
      width: 150px;
      height: 45px;
      background: #cc3300;
      border-radius: 20px;
      line-height: 45px;
      margin: 50px 25px;
      padding-left: 140px;
      font-weight: 700;
      color: #fff;
    }
  }
}
</style>