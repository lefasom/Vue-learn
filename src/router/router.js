import { createRouter, createWebHistory } from 'vue-router'
import Principal from '../views/Principal.vue'
import ListaDeElementos from '../views/ListaDeElementos.vue'

const routes = [
  {
    path: '/',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/lista',
    name: 'ListaDeElementos',
    component: ListaDeElementos
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
