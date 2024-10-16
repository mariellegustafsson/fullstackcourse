import { render, screen } from '@testing-library/react'
import Blog from './components/Blog.jsx'
import userEvent from '@testing-library/user-event'


test('renders title and author but not url and likes', async ()=>{
    const object = {
        title: "this is the title",
        author: "this is the author",
        url: "this is the url",
        likes: 0
    }
  render(<Blog blog={object}/>)
  const titleElement = await screen.findByText(/this is the title/)
  expect(titleElement).toBeVisible()
  const authorElement = await screen.findByText(/this is the author/)
  expect(authorElement).toBeVisible()
  const urlElement = screen.queryByText(/this is the url/)
  expect(urlElement).not.toBeVisible()
  const likesElement = screen.queryByText(/0/)
  expect(likesElement).not.toBeVisible()
  //screen.debug()

})

test('when view button is clicked, the url and number of likes are shown'), () =>{
    const mockHandler = vi.fn()
    render(
        <Blog blog={object} toggleVisibility={mockHandler} />)
 
    const user = userEvent.setUp()
    const button = screen.getByText("view")
    user.click(button)

    const urlElement = screen.queryByText(/this is the url/)
    expect(urlElement).toBeVisible()
    const likesElement = screen.queryByText(/0/)
    expect(likesElement).toBeVisible()
} 

test('when like button is clicked twice, the event handler gets called twice'), () =>{
    const mockHandler = vi.fn()
    render(
        <Blog blog={object} toggleVisibility={mockHandler} />)
 
    const user = userEvent.setUp()
    const button = screen.getByText("view")
    user.click(button)
    user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
} 

