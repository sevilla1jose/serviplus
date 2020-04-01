import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/app'),
    redirect: '/app/dashboards',
    //beforeEnter: AuthRequired,
    children: [
      {
        path: 'app/dashboards',
        component: () => import('@/views/app/dashboards'),
        //beforeEnter: AuthRequired,
        redirect: '/app/dashboards/index',
        children: [
          { path: 'index', component: () => import('@/views/app/dashboards/Default') }
        ]
      },
      {
        path: 'app/account',
        component: () => import('@/views/app/account'),
        //beforeEnter: AuthRequired,
        redirect: '/app/account/profile',
        children: [
          { path: 'profile', component: () => import('@/views/app/account/Default') },
          { path: 'setting', component: () => import('@/views/app/account/Default') }
        ]
      }
    ]
  },
  {
    path: '/error',
    component: () => import('@/views/Error')
  },
  {
    path: '/sesion',
    component: () => import('@/views/sesion'),
    redirect: '/sesion/login',
    children: [
      { path: 'login', component: () => import('@/views/sesion/Login') },
      { path: 'forgot-password', component: () => import('@/views/sesion/ForgotPassword') },
      { path: 'sign-in', component: () => import('@/views/sesion/SignIn') }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/Error')
  }]

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
