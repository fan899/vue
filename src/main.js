import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"; // 引入Vuex
import './assets/global.css'; // 引入全局样式
import ElementUI from 'element-ui'; // 引入element
import 'element-ui/lib/theme-chalk/index.css';
import request from "@/utils/request";// 引入element

Vue.config.productionTip = false

Vue.use(ElementUI,{size:"mini"}); // 引入element
Vue.prototype.request = request // 引入request.js

new Vue({
  router,
  store, // 引入vuex
  render: h => h(App)
}).$mount('#app')
