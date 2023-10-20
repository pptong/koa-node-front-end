import storage from 'store'
import store from '@/store'
import { whiteList } from './basics.router'
import { Router, RouteRecordRaw } from 'vue-router'


const loginPath = '/login'
const defultPath = '/'

// 权限验证

export const permission = (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (storage.get('token')) {
      if (to.path === loginPath) {
        next({ path: defultPath })
      } else {
        if (store.state.auth.name.length === 0) {
          store.dispatch('auth/userInfo').then(() => {  
            store.dispatch('auth/menu').then(e => {
              e.forEach((item: RouteRecordRaw) => {
                router.addRoute(item)
              })
              router.addRoute({ path: '/:pathMatch(.*)*', redirect: '/404' })
              const redirect = from.query.redirect as string | undefined
              if (redirect && to.fullPath === redirect) {
                next({ ...to, replace: true })
              } else {
                next({ ...to })
              }
            })
          }).catch(() => {
            storage.remove('token')
            next({ path: loginPath, query: { redirect: to.fullPath } })
          })
        } else {
          next()
        }
      }
    } else {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next({ path: loginPath, query: { redirect: to.fullPath } })
      }
    }
  })

}
