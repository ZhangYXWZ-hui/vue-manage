import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    name: 'login',
    path: '/login',
    component: () => import('../views/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    name: 'main',
    path: '/',
    meta: {
      title: '首页',
    },
    component: () => import('../components/main.vue'),
    children: [{
        name: 'home',
        path: '/',
        component: () => import('../views/home.vue'),
        meta: {
          title: '主页',
        },

      },
      {
        name: 'userList',
        path: '/user/userList',
        component: () => import('../views/userList.vue'),
        meta: {
          title: '用户列表',
        }
      },
      {
        name: 'authority',
        path: '/user/authority',
        component: () => import('../views/authority.vue'),
        meta: {
          title: '用户权限管理',
        }
      },
      {
        name: 'role',
        path: '/user/role',
        component: () => import('../views/role.vue'),
        meta: {
          title: '用户角色管理',
        }
      },
      {
        name: 'articleList',
        path: '/article/articleList',
        component: () => import('../views/articleList.vue'),
        meta: {
          title: '文章列表',
        }
      },
      {
        name: 'articleUpload',
        path: '/article/upload',
        component: () => import('../views/upload.vue'),
        meta: {
          title: '文章上传',
        }
      },
      {
        name: 'articleReview',
        path: '/article/review',
        component: () => import('../views/review.vue'),
        meta: {
          title: '文章审核',
        }
      },
      {
        name: 'articleEditor',
        path: '/article/editor',
        component: () => import('../views/articleEditor.vue'),
        meta: {
          title: '文章编辑',
        }
      },
      {
        name: 'website',
        path: '/web/website',
        component: () => import('../views/website.vue'),
        meta: {
          title: '网站管理',
        }
      },
      {
        name: 'routerList',
        path: '/web/routerList',
        component: () => import('../views/routerList.vue'),
        meta: {
          title: '路由管理',
        }
      },
      {
        name: 'websiteInfor',
        path: '/web/websiteInfor',
        component: () => import('../views/websiteInfor.vue'),
        meta: {
          title: '网站信息',
        }
      },
      {
        name: 'adList',
        path: '/ad/adList',
        component: () => import('../views/adList.vue'),
        meta: {
          title: '广告列表',
        }
      },
      {
        name: 'adUpload',
        path: '/ad/adUpload',
        component: () => import('../views/adUpload.vue'),
        meta: {
          title: '广告上传'
        }
      },
      {
        name: 'adReview',
        path: '/ad/adReview',
        component: () => import('../views/adReview.vue'),
        meta: {
          title: '广告审核'
        }
      }
    ]
  },
  {
    name: '404',
    path: '/404',
    meta: {
      title: '404'
    },
    component: () => import('../views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]


const router = new VueRouter({
  routes
})

export default router