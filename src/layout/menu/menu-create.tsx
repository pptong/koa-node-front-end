import { defineComponent, Slots } from "vue"
import { RouterObj } from '@/types/api/login'
import aIcon from '@/components/aicon/aicon.vue'
export default defineComponent({
  components: {
    aIcon
  },
  props: {
    router: {
      type: Object,
      required: true
    }
  },
  render () {
    const menuSub = (router: RouterObj) => {
      const subSlots: Slots = {
        title: () => [<span>{ router.menuName }</span>],
        icon: () => [<aIcon type= { router.icon || 'FolderOutlined' } />] 
      }
      return (
        <a-sub-menu v-slots={ subSlots } key={ router.menuCode }>
          { 
            router.children && router.children.map(item => (
              menuCreate(item)
            )) 
          }
        </a-sub-menu>
      )
    }

    const menuItem = (router: RouterObj) => {
      const itemSlots: Slots = {
        icon: () => router.icon ? [<aIcon type= { router.icon || '' } />] : []
      }
      return (
        <a-menu-item v-slots={ itemSlots } key={ router.menuCode }>
          <router-link to={ router.path }>{ router.menuName }</router-link>
        </a-menu-item>
      )
    }

    const menuCreate = (router: RouterObj) => {
      if (router.children && !router.hidden) {
        return menuSub(router)
      } else if (!router.hidden) {
        return menuItem(router)
      }
    }

    return menuCreate(this.router as RouterObj)
  }
})