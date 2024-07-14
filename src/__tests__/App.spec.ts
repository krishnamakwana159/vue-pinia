// import App from '@/App.vue'
// import NavBar from '@/core/components/NavBar.vue'
// import { RouterLinkStub, mount } from '@vue/test-utils'
// import { beforeEach } from 'node:test'
// import { describe, expect, it, vi } from 'vitest'

// describe('App Component', () => {
//   beforeEach(() => {
//     // vi.resetAllMocks()
//     // vi.resetModules()
//   })

//   it('Check the Navbar is render or not', () => {
//     const mockRouter = {
//       push: vi.fn()
//     }

//     const wrapper = mount(App, {
//       global: {
//         mocks: {
//           $router: mockRouter
//         },
//         stubs: {
//           RouterLink: RouterLinkStub
//         }
//       }
//     })

//     expect(wrapper.findComponent(NavBar).exists()).toBeTruthy()
//   })

//   it('check the behaviour of the navbar', async () => {
//     const mockRouter = {
//       push: vi.fn()
//     }

//     const mockRoute = {
//       path: '/admin/productList'
//     }

//     const wrapper = mount(App, {
//       //   router,
//       global: {
//         stubs: {
//           RouterLink: RouterLinkStub
//         },
//         // plugins: [router],
//         mocks: {
//             $router: mockRouter,
//           //   $route: mockRoute
//         }
//       }
//     })

//     await mockRouter.push({
//       path: '/admin/productList'
//     })

//     // await wrapper.vm.$nextTick()

//     // expect(wrapper.findComponent(ProductList).exists()).toBeTruthy()

//     // mockRouter.push()
//     expect(mockRouter.push).toHaveBeenCalledTimes(1)

//     await mockRouter.push({
//       path: '/admin/productForm'
//     })

//     await wrapper.vm.$nextTick()

//     // expect(wrapper.findComponent(ProductForm).exists()).toBeTruthy()

//     expect(mockRouter.push).toHaveBeenCalledTimes(2)
//   })
// })
