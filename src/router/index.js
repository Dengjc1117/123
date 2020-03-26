import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login.vue")
  }, {
    path: "/register",
    component: () => import("@/views/Register.vue")
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
