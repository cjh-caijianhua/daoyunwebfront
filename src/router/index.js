import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    /*
      path: '/',
      name: 'Home',
      component: Home
      */
    path: '/',
    redirect: '/manageboard'
    //component: () => import( /* webpackChunkName: "manageboard" */ '../components/page/ManageBoard.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    component: () => import( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
    children: [{
        path: '/manageboard',
        component: () => import( /* webpackChunkName: "manageboard" */ '../components/page/ManageBoard.vue'),
        meta: {
          title: '系统首页'
        }
      },
      {
        path: '/table',
        component: () => import( /*webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
        meta: {
          title: '基础表格'
        }
      },
      {
        path: '/role',
        component: () => import( /*webpackChunkName: "role" */ '../components/page/RoleManage.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: '/form',
        component: () => import( /*webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
        meta:{
          title:'表单编辑'
        }
      },
      {
        path: '/test1',
        component: () => import( /*webpackChunkName: "test1" */ '../components/page/DicManage'),
        meta:{
          title:'测试1'
        }
      },
      {
        path: '/test2',
        component: () => import( /*webpackChunkName: "test2" */ '../components/page/test2.vue'),
        meta:{
          title:'测试2'
        }
      },
      {
        path: '/403',
        component: () => import( /*webpackChunkName: "403" */ '../components/page/403.vue'),
        meta:{
          title:'403'
        }
      },
      {
        path: '/404',
        component: () => import( /*webpackChunkName: "404" */ '../components/page/404.vue'),
        meta:{
          title:'404'
        }
      },
      {
        path: '/500',
        component: () => import( /*webpackChunkName: "404" */ '../components/page/500.vue'),
        meta:{
          title:'500'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
