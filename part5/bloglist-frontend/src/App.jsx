import { useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [Message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }}


    const addBlog = (blogObject) => {
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          blogFormRef.current.toggleVisibility()
        })

        const m = `${blogObject.title} by ${blogObject.author} added to the bloglist`;
        setMessage(m);
        setTimeout(() => {
          setMessage("")
        }, 5000)
        console.log(Message)
    }



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b)=> b.likes - a.likes) )
    )  
  }, [])

  const logout=()=>{
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }



        if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      
      </div>
    )
  }
return (
<div>

<Notification message={Message}/>

<Togglable buttonLabel="create new blog" ref={blogFormRef}>
<BlogForm createBlog={addBlog} />
    </Togglable>

      <h2>blogs</h2>
      <p>{user.username} is logged in <button onClick={logout}>log out</button></p>
      {blogs
      .sort((a, b) => b.likes - a.likes) 
      .map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
      )}
    </div>
  )
}
export default App

