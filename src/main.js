import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入 axios
import axios from "axios";
import Vant from 'vant';
import { Toast } from 'vant';
import { Form } from 'vant';
import { ActionSheet } from 'vant';
import { Uploader } from 'vant';


Vue.use(Uploader); //文件上传
Vue.use(Form);   //表单插件
Vue.use(Toast);  //toast轻提示组件
Vue.use(ActionSheet); //上拉菜单组件
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

Vue.use(Vant);


axios.defaults.baseURL = "http://localhost:3000";

router.beforeEach((to, from, next) => {
  if (to.path === "/Personal") {
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    if (userInfo.token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
