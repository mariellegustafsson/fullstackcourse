const loginWith = async (page, username, password)  => {
    await page.getByRole('textbox').first().fill(username)
    await page.getByRole('textbox').last().fill(password)
    await page.getByRole('button', { name: 'login' }).click()
    
  }
  const createBlog = async (page, content) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByPlaceholder('blogpost title').fill(content.title)
    await page.getByPlaceholder('blogpost author').fill(content.author)
    await page.getByPlaceholder('blogpost url').fill(content.url);
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByRole('button', { name: 'view' }).waitFor()
  }
  
  export { loginWith, createBlog }