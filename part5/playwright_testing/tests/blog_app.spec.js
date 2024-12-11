const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:5173/api/testing/reset')
        await request.post('http://localhost:5173/api/users', {
          data: {
            name: 'Marielle G',
            username: 'marielle',
            password: 'secret'
          }
        })
        await page.goto('http://localhost:5173')
        })
  
    
    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to application')
        await expect(locator).toBeVisible()
        // I think we can expect that the login form is visible if the texts "username" and "password" are visible
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        })

  test('login works', async ({ page }) => {

    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox').first().fill('marielle')
    await page.getByRole('textbox').last().fill('secret')
    await page.getByRole('button', { name: 'login' }).click()
  
  
    await expect(page.getByText('marielle is logged in')).toBeVisible()

  })
  test('login fails with wrong credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox').first().fill('marielle')
    await page.getByRole('textbox').last().fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()
// I expect that the user is not logged in if the log in page is still visible after trying to login
    await expect(page.getByText('Log in to application')).toBeVisible()
  })
    

})