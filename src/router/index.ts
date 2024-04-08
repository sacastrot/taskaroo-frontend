import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/tasks/:id',
      name: 'task',
      component: () => import('@/views/TaskView.vue')
    }
  ]
})

export default router
