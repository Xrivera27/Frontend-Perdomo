import { createRouter, createWebHistory } from 'vue-router'
import HomeList from '../Pages/HomeList.vue'
import EmpresasList from '@/Pages/EmpresasList.vue'
import UsuariosList from '@/Pages/UsuariosList.vue'
import ConfigPage from '@/Pages/ConfigPage.vue'
import CategoriasEmpresasList from '@/Pages/CategoriasEmpresasList.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeList,
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
    path: '/categorias-empresas',
    name: 'categorias-empresas',
    component: CategoriasEmpresasList,
  },

  {
    path: '/:pathMatch(.*)*', // Ruta para manejar rutas no encontradas
    redirect: '/home'
  },

  {
    path: '/',
    redirect: '/home' // Redirige a /login cuando se accede a la ruta raíz
  },

]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
