import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm works', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('blogpost title')
  const authorInput = screen.getByPlaceholderText('blogpost author')
  const urlInput = screen.getByPlaceholderText('blogpost url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'test1')
  await user.type(authorInput, 'test2')
  await user.type(urlInput, 'test3')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test1')
  expect(createBlog.mock.calls[0][0].author).toBe('test2')
  expect(createBlog.mock.calls[0][0].url).toBe('test3')
})