import ProductList from '@/core/components/ProductList.vue'
import type { RouteRecordRaw } from 'vue-router'
import AdminDashboard from './views/AdminDashboard.vue'
import ProductForm from './components/ProductForm.vue'
import Cart from '@/core/components/Cart.vue'

export const AdminRoute: Readonly<RouteRecordRaw[]> = [
  {
    component: AdminDashboard,
    path: '/admin',
    name: 'admin',
    redirect: 'admin/productList',
    children: [
      {
        path: 'productList',
        name: 'productList',
        component: ProductList
      },
      {
        path: 'productForm',
        name: 'productForm',
        component: ProductForm
      },
      {
        path: 'cart',
        name: 'cart',
        component: Cart
      }
    ]
  }
]
