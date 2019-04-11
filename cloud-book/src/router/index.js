import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/index',
      component: () => import('@/views/layout'),
      children: [
        {
          path: 'index',
          name: 'index',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/index')
        }
      ]
    },
    {
      path: '/details/:id',
      name: 'details',
      meta: {
        title: '详情页'
      },
      component: () => import('@/views/details')
    },
    {
      path: '/titles/:id',
      name: 'titles',
      meta: {
        title: '书籍目录'
      },
      component: () => import('@/views/titles')
    },
    {
      path: '/article/:id',
      name: 'article',
      meta: {
        title: '章节详情'
      },
      component: () => import('@/views/articles')
    },
    {
      path: '/personal',
      name: 'personal',
      mata: {
        title: '个人中心'
      },
      component: () => import('@/views/personal')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登陆界面'
      },
      component: () => import('@/views/login')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册界面'
      },
      component: () => import('@/views/register')
    },
    {
      path: '/study',
      name: 'study',
      meta: {
        title: '我的学习'
      },
      component: () => import('@/views/study')
    },
    {
      path: '/change',
      name: 'change',
      meta: {
        title: '修改个人信息'
      },
      component: () => import('@/views/change')
    },
    {
      path: '/changeName',
      name: 'changeName',
      meta: {
        title: '修改昵称'
      },
      component: () => import('@/views/changeName')
    },
    {
      path: '/changePwd',
      name: 'changePwd',
      meta: {
        title: '修改密码'
      },
      component: () => import('@/views/changePwd')
    },
    {
      path: '/changeDes',
      name: 'changeDes',
      meta: {
        title: '修改个性签名'
      },
      component: () => import('@/views/changeDes')
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        title: '测试页面'
      },
      component: () => import('@/views/test')
    }
  ]
})

router.beforeEach((to,from,next) => {
  // let title = to.meta.title;
  // document.title = title;
  next();
})

export default router;
