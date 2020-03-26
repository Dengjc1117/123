import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入 axios
import axios from "axios";
import Vant from 'vant';
import { Toast } from 'vant';
import { Form } from 'vant';

Vue.use(Form);   //表单插件
Vue.use(Vant);
Vue.use(Toast);  //弹窗插件
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

axios.defaults.baseURL = "http://localhost:3000";


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
