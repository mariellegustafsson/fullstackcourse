const { argv } = require('node:process')
require('dotenv').config()
const password = process.argv[2]
const url = `mongodb+srv://mariellegustafsson:${password}@cluster0.ondva.mongodb.net/testing?retryWrites=true&w=majority&appName=Cluster0`


const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}


mongoose.set('strictQuery',false)

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
const Blog = mongoose.model('Blog', blogSchema)

if (argv[3]=== undefined){
  console.log('bloglist')
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })}
else{
  const blog = new Blog({
    title: process.argv[3],
    author: process.argv[4],
    url: process.argv[5],
    likes: process.argv[6]
  })

  

  blog.save().then(() => {
    console.log(`${process.argv[3]}, author ${process.argv[4]} added to bloglist`)
    mongoose.connection.close()
  })
}
