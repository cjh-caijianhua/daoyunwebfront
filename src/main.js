import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import axios from 'axios'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(ElementUI, {
  size: 'small'
});

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if(config.url.indexOf('/Login/checkLogin') >= 0){
      return config;
    }
    else{
      if (localStorage.getItem('token') && localStorage.getItem('token') != "undefined") {
        config.headers.token = localStorage.getItem('token');
      }
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  });