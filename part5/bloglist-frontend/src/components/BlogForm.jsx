import { useState } from 'react'
import Notification from './Notification'

const BlogForm = ({createBlog}) =>{
    const [newTitle, setNewTitle] = useState('')
    const[newAuthor, setNewAuthor] = useState('')
    const[newUrl, setNewUrl] = useState('')
    const[successMessage, setSuccessMessage] = useState("")

    const addBlog = async (event) => {
        event.preventDefault()
        console.log("button clicked")
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }
        await createBlog(blogObject)

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
 
      }

        
return(
    <div>
<form onSubmit={addBlog}>

        <div> title: <input value={newTitle} onChange={event => setNewTitle(event.target.value)} placeholder='blogpost title'/></div>
        <div>author: <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)} placeholder='blogpost author'/></div>
        <div>url: <input value={newUrl} onChange={event => setNewUrl(event.target.value)} placeholder='blogpost url'/></div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
      </div>

)

}


export default BlogForm