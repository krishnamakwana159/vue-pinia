import { createRouter, createWebHistory } from 'vue-router'
import { AdminRoute } from '@/modules/admin/route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...AdminRoute]
})

export default router
