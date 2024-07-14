import { test, expect } from '@playwright/test'

// Define the login page URL
const loginPageUrl = 'http://localhost:5173/admin/login' // Replace with your login page URL

// Define a beforeEach hook to navigate to the login page before each test
test.beforeEach(async ({ page }) => {
  await page.goto(loginPageUrl)
})

test('Login form displays error messages for empty fields', async ({ page }) => {
  // const browser = await chromium.launch({
  //     headless: false
  //   });
  //   const context = await browser.newContext();
  //   const page = await context.newPage();

  // using page
  // await page.click('button[type="submit"]');
 
  // using locators
  await page.getByRole('link', { name: 'Login' }).click()

  await page.getByRole('button', { name: 'Login' }).click()
//   await expect(page).toHaveTitle(/Login Page/);
  await expect(page).toHaveTitle(/Vite App/);
  const usernameLocator = page.locator('#username-error');
  await expect(usernameLocator).toHaveText(/Value is required/)

  const passwordLocator = page.locator('#password-error')
  await expect(passwordLocator).toHaveText(/Value is required/)

})

test('Login form- empty username field', async ({ page }) => {
  const passwordField = page.getByPlaceholder("Enter password")
  // const passwordLocator = page.locator('#password-error')
  // await expect(passwordLocator).toHaveText(/Value is required/)

   await passwordField.fill('password')
  // await page.getByRole('button', { name: /login/i }).click();
   await page.click('button[type="submit"]')
  
  await page.getByText('The maximum length allowed is').isVisible();
  await page.click('button[type="submit"]')

  const usernameLocator = page.locator('#username-error');
  await expect(usernameLocator).toHaveText(/Value is required/)

 
  //await page.getByText('/value is required/i').isEnabled();
  // const usernameLocator = page.locator('#username-error');
  // await expect(usernameLocator).toBeVisible();
  //await expect(usernameLocator).toHaveText('Value is required')
  
  const isErrorVisible = await page.waitForSelector('#password-error', { timeout: 200}).then(() => true).catch(() => false);
  console.log(isErrorVisible)    
  await expect(isErrorVisible).toBe(true);
  await expect(page.locator('#username-error')).toHaveText('Value is required')
  
})

test('Error message for empty password field', async ({ page }) => {

  await page.fill('input[type="text"]', 'username')
  await page.click('button[type="submit"]')

  await expect(page.locator('#password-error')).toHaveText('Value is required')
  await expect(page.locator('#username-error')).not.toBeVisible()

})

test('Login form submits with valid data', async ({ page }) => {
  await page.fill('input[type="text"]', 'username')
  await page.fill('input[type="password"]', 'passw') //max length allowed is 5 

  await page.click('button[type="submit"]')

  const url = page.url()
  expect(url).toContain('/productList')
})
