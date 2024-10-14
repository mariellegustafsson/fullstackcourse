import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const[newAuthor, setNewAuthor] = useState('')
  const[newUrl, setNewUrl] = useState('')
  const [Message, setMessage] = useState(null)

  const handleTitleChange = (event) =>{
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) =>{
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) =>{
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }}

const addBlog = async (event) => {
  event.preventDefault()
  console.log("button clicked")
  const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
  }
  const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setMessage(`${blogObject.title} by ${blogObject.author} added to the bloglist`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const logout=()=>{
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='message'>
        {message}
      </div>
    )}


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

<form onSubmit={addBlog}>
        <div> title: <input value={newTitle} onChange={handleTitleChange}/></div>
        <div>author: <input value={newAuthor} onChange={handleAuthorChange}/></div>
        <div>url: <input value={newUrl} onChange={handleUrlChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>blogs</h2>
      <p>{user.username} is logged in <button onClick={logout}>log out</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
export default App

