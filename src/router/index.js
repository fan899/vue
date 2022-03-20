import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"; // 导入Vuex
import HomeView from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',

    component: () => import('../views/Manage'),
    redirect: '/home',
    children: [
      {path: 'home', name: '主页', component: () => import('../views/Home')}, // 导入Home.vue
      {path: 'user', name: '用户信息', component: () => import('../views/User')}  // 将User.vue的页面内容通过子路由的方式在页面中展示
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name) // 把获取的当前路由名称设置进去
  store.commit("setPath") // 触发store的数据更新
  next() // 放行路由
})

export default router
