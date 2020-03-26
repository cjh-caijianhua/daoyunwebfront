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
        path: '/RoleManage',
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
        component: () => import( /*webpackChunkName: "test1" */ '../components/page/test1.vue'),
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