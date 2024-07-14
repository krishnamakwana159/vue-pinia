// import { test, expect, type Page } from '@playwright/test'

// const baseServerUrl: string = 'http://localhost:5173/'
// const relativeAdminUrl: string = 'admin/'
// const adminUrl: string = baseServerUrl + relativeAdminUrl
// const productFormUrl: string = adminUrl + 'productForm'
// const productListUrl: string = adminUrl + 'productList'
// const productCartUrl: string = adminUrl + 'cart'

// const routes: Readonly<any[]> = [
//   { id: 'productList', url: productListUrl, heading: 'Product List' },
//   { id: 'productForm', url: productFormUrl, heading: 'Add Product Form' },
//   { id: 'cart', url: productCartUrl, heading: 'Your Cart' }
// ]

// test.beforeEach(async ({ page }) => {
//   await page.goto(productListUrl)
// })

// test.describe('Routing', () => {
//   test('Navigate with Navbar', async ({ page }) => {
//     for (let i = 0; i < routes.length; i++) {
//       const x = routes[i]
//       await page.getByTestId(`mainNav-${x.id}`).click()
//       await expect(page).toHaveURL(x.url)
//       await expect(page.getByRole('heading', { name: x.heading })).toBeVisible()
//     }
//   })

//   test('Navigate by Url through browser', async ({ page }) => {
//     for (let i = 0; i < routes.length; i++) {
//       const x = routes[i]
//       await page.goto(x.url)
//       await expect(page.getByRole('heading', { name: x.heading })).toBeVisible()
//     }
//   })
// })
