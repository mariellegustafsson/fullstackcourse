import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
const [visible, SetVisible] = useState(false)
const [likes, setLikes] = useState(blog.likes)

const showLess = { display: visible ? 'none' : '' }
const showMore = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const likeClick = () =>{
  const updatedBlog = {
    user: blog.user.id,
    likes: likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
   blogService.addLike(blog.id, updatedBlog)
   .then(returnedBlog => {

    const updatedBlogs = blogs
      .map(b => b.id === returnedBlog.id ? returnedBlog : b)
      .sort((a, b) => b.likes - a.likes)

    setBlogs(updatedBlogs)

   setLikes(likes+1)
  })}

  const removeClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
    blogService.remove(blog.id)
    const blogCopy = blogs
    setBlogs(blogCopy.filter(b => b.id !== blog.id))
    }
  }



  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
  <div style={showLess}>
     <button onClick={()=>SetVisible(true)}>view</button>
  </div>  
  <div style={showMore}>
  <button onClick={()=>SetVisible(false)}>hide</button> 
  <br/>{blog.url} 
  <br/> likes {likes} <button onClick={likeClick}>like</button>
  <br/> <button onClick={removeClick}>remove</button>
  </div>
  </div>
)
}

export default Blog

