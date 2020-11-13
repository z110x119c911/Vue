import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import Login from '@/components/pages/login'
import products from '@/components/pages/products'
import checkList from '@/components/pages/checkList'
import coupon from '@/components/pages/coupon'
import testList from '@/components/pages/TestList'
import CheckOut from '@/components/pages/checkout'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: dashboard,
      children:[
        {
          path: 'products',
          name: 'products',
          component: products,
          meta: { requiresAuth: true },
        },
        {
          path: 'checkList',
          name: 'checkList',
          component: checkList,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: coupon,
          meta: { requiresAuth: true },
        },
        {
          path: 'TestList',
          name: 'TestList',
          component: testList,
        },
        {
          path: 'checkout/:orderId',
          name: 'checkout',
          component: CheckOut,
        },
      ]
    },
  ]
})
