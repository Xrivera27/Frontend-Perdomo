import { createRouter, createWebHistory } from 'vue-router'
import HomeList from '../Pages/HomeList.vue'
import SucursalesList from '@/Pages/SucursalesList.vue'
import UsuariosList from '@/Pages/UsuariosList.vue'
import ConfigPage from '@/Pages/ConfigPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeList
    },
    {
      path: '/sucursales',
      name: 'sucursales',
      component: SucursalesList
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsuariosList
    },
      
    {
      path: '/config-page',
      name: 'config-page',
      component: ConfigPage
    }

  ]
})

export default router
