import {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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
   setLikes(likes+1)
  }



  return(
    <div style={blogStyle}>
  <div style={showLess}>
    {blog.title} <button onClick={()=>SetVisible(true)}>view</button>
  </div>  
  <div style={showMore}>
  {blog.title} <button onClick={()=>SetVisible(false)}>hide</button> 
  <br/>{blog.url} 
  <br/> likes {likes} <button onClick={likeClick}>like</button>
  <br/>{blog.author}
  </div>
  </div>
)
}

export default Blog

