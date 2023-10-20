import { createStore, ModuleTree } from 'vuex'
import auth, { UserState } from './modules/auth'
import tabs, { TabState } from './modules/tabs'
import menu, { menuState } from './modules/menu'
import keepAlive, { keepAliveState } from './modules/keepAlive'

export interface AllState {
  auth: UserState,
  tabs: TabState,
  menu: menuState
  keepAlive: keepAliveState
}


// 实例化
const store = createStore<AllState>({

  modules: {
    auth,
    tabs,
    menu,
    keepAlive
  }

})

export default store
