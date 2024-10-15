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

        const message = `${blogObject.title} by ${blogObject.author} added to the bloglist`;
        setSuccessMessage(message);
        setTimeout(() => {
          setSuccessMessage("")
        }, 5000)
        console.log(successMessage)
 
      }

        
return(
    <div>
    <Notification message={successMessage}/>
<form onSubmit={addBlog}>

        <div> title: <input value={newTitle} onChange={event => setNewTitle(event.target.value)}/></div>
        <div>author: <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)}/></div>
        <div>url: <input value={newUrl} onChange={event => setNewUrl(event.target.value)}/></div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
      </div>

)

}

export default BlogForm