/**
 * In this file we define the routes for the application.
 *
 * The routes are defined as an array of objects, where each object represents a route.
 *
 * Each route object has the following properties:
 * - path: The path of the route
 * - name: The name of the route
 * - component: The component to render when the route is active
 *
 * The routes are defined using the createRouter function from Vue Router.
 *
 */

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    /**
     * The home route is the default route for the application.
     */
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },

    /**
     * The tasks route is used to display a list of tasks.
     */
    {
      path: '/tasks/:id',
      name: 'task',
      component: () => import('@/views/TaskView.vue')
    }
  ]
})

export default router
