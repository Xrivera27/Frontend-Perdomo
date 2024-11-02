import { createRouter, createWebHistory } from 'vue-router'
import HomeList from '../Pages/HomeList.vue'
import EmpresasList from '@/Pages/EmpresasList.vue'
import UsuariosList from '@/Pages/UsuariosList.vue'
import ConfigPage from '@/Pages/ConfigPage.vue'
import ProveedoresList from '@/Pages/ProveedoresList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeList
    },
    {
      path: '/empresas',
      name: 'empresas',
      component: EmpresasList
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
    },

    {
      path: '/proveedores',
      name: 'proveedores',
      component: ProveedoresList,
    },

    {
      path: '/:pathMatch(.*)*', // Ruta para manejar rutas no encontradas
      redirect: '/'
    },

    {
      path: '/',
      redirect: '/home' // Redirige a /login cuando se accede a la ruta raíz
    },

  ]
})

export default router
