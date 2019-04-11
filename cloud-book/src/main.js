// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css/normalize.css' //引入初始化样式
import 'amfe-flexible/index'//淘宝的移动端适配方案
import {fetch} from "./utils";
import api from "@/utils/api"
import '@/globalCss/init.scss'
import store from '@/store'

Vue.config.productionTip = false;
Vue.prototype.$axios = fetch;
Vue.prototype.$api = api;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
