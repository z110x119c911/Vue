// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
//驗證代碼
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'
//loading
import 'vue-loading-overlay/dist/vue-loading.css'
//bootstrap
import 'bootstrap'


import App from './App'
import router from './router'
//自訂filter
import './bus'
import currencyFilter from './filter/currency'
import dateTimestamp from './filter/date'
// 

Vue.config.productionTip = false;
Vue.use(VueAxios, axios)
Vue.component('Loading',Loading)

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
 
localize('zh_TW', TW);
 
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
 
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

Vue.filter('currency', currencyFilter)
Vue.filter('date', dateTimestamp)
axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//驗證是否登入
router.beforeEach((to, from, next) => {
  console.log('to',to,'from',from,'next',next); 

  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {  
      console.log(response.data); 
      if(response.data.success){
        next();
      }else{
        next({
          path: '/login'
        })
      }
    });
  }else{
    next();
  }
  
})