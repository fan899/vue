import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入全局样式
import './assets/global.css';

// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入request.js
import request from "@/utils/request";

Vue.config.productionTip = false

// 引入element
Vue.use(ElementUI,{size:"mini"});
// 引入request.js
Vue.prototype.request = request

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
