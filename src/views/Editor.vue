<template>
  <div class="box">
    <!-- 顶部导航 -->
    <Navigate title="编辑资料"></Navigate>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + userInfo.head_img" />
      <van-uploader :after-read="afterRead" class="upload" />
    </div>
    <!-- 信息 -->
    <Listber label="昵称" :tips="userInfo.nickname" @click.native="editshow=true"></Listber>
    <van-dialog
      v-model="editshow"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickName"
      @cancel="cancelEdit"
    >
      <van-cell-group>
        <van-field v-model="info.nickname" placeholder="请输入昵称" />
      </van-cell-group>
    </van-dialog>

    <Listber label="密码" tips="******" @click.native="editpwd=true"></Listber>
    <van-dialog v-model="editpwd" title="修改密码" show-cancel-button @confirm="editPassword">
      <van-cell-group>
        <van-field v-model="info.password" placeholder="请输入新密码" type="password" />
      </van-cell-group>
    </van-dialog>
    <Listber label="性别" :tips="['女','男'][userInfo.gender]" @click.native="openSelect"></Listber>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      close-on-click-action
    />
  </div>
</template>

<script>
//导入顶部导航 组件
import Navigate from "@/components/Navigate.vue";
//导入 列表 组件
import Listber from "@/components/Listber.vue";
export default {
  mounted() {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.token = userInfo.token;
    this.$axios({
      url: `/user/${userInfo.user.id} `,
      headers: {
        Authorization: userInfo.token
      }
    }).then(response => {
      //将请求回来数据存入组件data中.
      this.userInfo = response.data.data;
      this.info.nickname = response.data.data.nickname;
    });
  },
  data() {
    return {
      userInfo: {},
      info: {
        nickname: "",
        password: ""
      },
      token: "",
      show: false,
      editshow: false,
      editpwd: false,
      actions: [
        { name: "男", value: 1 },
        { name: "女", value: 0 }
      ]
    };
  },
  methods: {
    // 封装修改资料请求 value 请求参数 ,fn 请求成功后的回调函数.
    editInfo(value, fn) {
      this.$axios({
        url: `/user_update/${this.userInfo.id}`,
        method: "post",
        headers: {
          Authorization: this.token
        },
        data: value
      }).then(fn);
    },

    //性别点击事件. 显示上拉菜单.
    openSelect() {
      this.show = true;
    },

    //上拉菜单事件.
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.editInfo({ gender: item.value }, response => {
        this.$toast.success(response.data.message);
        this.userInfo.gender = item.value;
      });
    },

    // 上传头像进行头像修改
    afterRead(file) {
      const formdata = new FormData();
      formdata.append("file", file.file);
      //头像上传
      this.$axios({
        url: "/upload",
        method: "post",
        headers: {
          Authorization: this.token
        },
        data: formdata
      }).then(response => {
        const { url } = response.data.data;
        //调用修改信息函数
        this.editInfo({ head_img: url }, response => {
          const { message, data } = response.data;
          //修改当前头像显示.
          this.userInfo.head_img = data.head_img;
          //成功提示.
          this.$toast.success("头像" + message);
        });
      });
    },
    //昵称修改
    editNickName() {
      this.editInfo({ nickname: this.info.nickname }, response => {
        const { message, data } = response.data;
        this.userInfo.nickname = data.nickname;
        this.$toast.success("昵称" + message);
      });
    },
    //取消修改昵称
    cancelEdit() {
      this.info.nickname = this.userInfo.nickname;
    },
    //确定 修改密码
    editPassword() {
      this.editInfo({ password: this.info.password }, response => {
        const { message } = response.data;

        const toast = this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "修改成功,请重新登录 3 后返回"
        });

        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `修改成功,请重新登录${second}后返回`;
          } else {
            localStorage.removeItem("userInfo");
            this.$router.replace("/login");
            clearInterval(timer);
            // 手动清除 Toast
            this.$toast.clear();
          }
        }, 1000);
      });
    },
    clearEdit() {
      this.info.password = "";
    }
  },
  components: {
    Navigate,
    Listber
  }
};
</script>

<style scoped lang="less">
.box {
  .avatar {
    position: relative;
    display: flex;
    padding: 25/360 * 100vw;
    justify-content: center;
    align-items: center;

    .upload {
      position: absolute;
      left: 50%;
      transform: translateX(-40/360 * 100vw);
      opacity: 0;
    }

    img {
      width: 80/360 * 100vw;
      height: 80/360 * 100vw;
      border-radius: 50%;
    }
  }
}
</style>