const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
      })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')
    await expect(locator).toBeVisible()
    // I think we can expect that the login form is visible if the texts "username" and "password" are visible
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {

    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox').first().fill('agnes112')
    await page.getByRole('textbox').last().fill('apple')
    await page.getByRole('button', { name: 'login' }).click()
  
  
    await expect(page.getByText('agnes112 is logged in')).toBeVisible()

  })
  test('login fails with wrong credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox').first().fill('agnes112')
    await page.getByRole('textbox').last().fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()
// I expect that the user is not logged in if the log in page is still visible after trying to login
    await expect(page.getByText('Log in to application')).toBeVisible()
  })
/*
  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByTestId('username').fill('agnes112')
      await page.getByTestId('password').fill('apple')
      await page.getByRole('button', { name: 'login' }).click()
    })



})
    */
    


})