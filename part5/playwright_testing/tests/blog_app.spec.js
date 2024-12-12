
const { loginWith, createBlog } = require('./helper')
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
    const username = 'marielle'
    const password = 'secret'
    await loginWith(page, username, password)
    await expect(page.getByText('marielle is logged in')).toBeVisible()

  })
  test('login fails with wrong credentials', async ({ page }) => {
    await loginWith(page, 'marielle', 'wrong')
// I expect that the user is not logged in if the log in page is still visible after trying to login
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
        await loginWith(page, 'marielle', 'secret')
        await page.getByText('marielle is logged in').waitFor()
    })


test('a new blog can be created', async ({ page }) => {
    const content = {
        title: 'this weeks menu',
        author: 'simon',
        url: 'menu.com'
    }
    await createBlog(page, content)

    await expect(page.getByText(`${content.title} ${content.author}`)).toBeVisible();
  }) 
  
  describe('and a note exists', () => {
    beforeEach(async ({ page }) => {
        const content = {
            title: 'my day',
            author: 'rebecca',
            url: 'life.com'
        }
        await createBlog(page, content)
        await page.getByRole('button', { name: 'view' }).waitFor()
    })

    test('a blogpost can be liked', async ({ page }) => { 
        //await expect(page.getByText('marielle is logged in')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).waitFor()
        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()

    })
    test('a note can be removed', async ({ page }) => { 
        page.on('dialog', async (dialog) => {
            console.log(dialog.message()) 
            await dialog.accept()
          })
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).waitFor()
        await page.getByRole('button', { name: 'remove' }).click()
        console.log("kom ända hit")
    

        await expect(page.getByText('my day rebecca')).not.toBeVisible()

  }) 
})

})
 
})