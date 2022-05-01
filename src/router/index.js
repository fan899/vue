import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"; // 导入Vuex
import HomeView from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',

    component: () => import('../views/Manage'),
    redirect: '/login',
    children: [
      {path: 'home', name: '主页', component: () => import('../views/Home')}, // 导入Home.vue
      {path: 'college', name: '院校信息', component: () => import("../views/College")},
      {path: 'major', name: '专业信息', component: () => import("../views/Major")},
      {path: 'class', name: '班级信息', component:() => import("../views/Class")},
      {path: 'student', name: '学生信息', component: () => import('../views/Student')}, // 增加学生信息页面
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
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
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
