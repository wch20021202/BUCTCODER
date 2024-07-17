import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/stuinf',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Stuinf',
        component: () => import('@/views/stuinf/index'),
        meta: { title: '学生列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/codeforce',
    component: Layout,
    redirect: '/codeforce/table',
    name: 'CodeForce',
    meta: { title: 'CodeForce', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'problem',
        name: 'Problem',
        component: () => import('@/views/problem/index'),
        meta: { title: 'Problem', icon: 'table' }
      },
      {
        path: 'match',
        name: 'Match',
        component: () => import('@/views/match/index'),
        meta: { title: 'Match', icon: 'tree' }
      },
      {
        path: 'rank',
        name: 'Rank',
        component: () => import('@/views/rank/index'),
        meta: { title: 'Rank', icon: 'table' }
      },
    ]
  },

  {
    path: '/atcoder',
    component: Layout,
    redirect: '/atcoder/table',
    name: 'AtCoder',
    meta: { title: 'AtCoder', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'problem_ac',
        name: 'Problem_ac',
        component: () => import('@/views/problem_ac/index'),
        meta: { title: 'Problem', icon: 'table' }
      },
      {
        path: 'match_ac',
        name: 'Match_ac',
        component: () => import('@/views/match_ac/index'),
        meta: { title: 'Match', icon: 'tree' }
      },
      {
        path: 'rank_ac',
        name: 'Rank_ac',
        component: () => import('@/views/rank_ac/index'),
        meta: { title: 'Rank', icon: 'table' }
      },
    ]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
