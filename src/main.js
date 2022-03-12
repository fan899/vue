import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入全局样式
import './assets/global.css';

// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// 引入element
Vue.use(ElementUI,{size:"mini"});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
