import {useState} from 'react'

const Blog = ({ blog }) => {
const [visible, SetVisible] = useState(false)

const showLess = { display: visible ? 'none' : '' }
const showMore = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
  <div style={showLess}>
    {blog.title} <button onClick={()=>SetVisible(true)}>view</button>
  </div>  
  <div style={showMore}>
  {blog.title} <button onClick={()=>SetVisible(false)}>hide</button> 
  <br/>{blog.url} 
  <br/> likes {blog.likes}
  <br/>{blog.author}
  </div>
  </div>
)
}

export default Blog

