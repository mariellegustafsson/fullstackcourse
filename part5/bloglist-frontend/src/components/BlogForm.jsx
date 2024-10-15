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

        setSuccessMessage(`${blogObject.title} by ${blogObject.author} added to the bloglist`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
 
      }

        
return(
    
<form onSubmit={addBlog}>
<Notification message={successMessage}/>
        <div> title: <input value={newTitle} onChange={event => setNewTitle(event.target.value)}/></div>
        <div>author: <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)}/></div>
        <div>url: <input value={newUrl} onChange={event => setNewUrl(event.target.value)}/></div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>


)

}

export default BlogForm