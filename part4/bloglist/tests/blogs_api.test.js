const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


const initialBlogs = [
    {
        title: "my best recipe",
        author: "wilma",
        url: "recipes.com",
        likes: 7
    },
    {
        title: "outfit of the day",
        author: "agnes",
        url: "fashion.com",
        likes: 3
    },
  ]

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })



test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
  })
  

test("the unique identifier is named id", async () =>{
    const response = await api.get('/api/blogs')
    assert.strictEqual((Object.keys(response.body[0]))[4], "id")
})

test("a new blogpost can be created", async () => {

    const newBlog = {
        title: "test blog",
        author: "marielle",
        url: "test.com",
        likes: 7
    }
    
    const initialResponse = await api.get('/api/blogs')
    const initialAmount = initialResponse.body.length

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.equal(response.body.length, initialAmount+1)
    
    })


test('a blogpost can be deleted', async () => {
    const initialResponse = await api.get('/api/blogs')
    const blogsAtStart = initialResponse.body
    const blogToDelete = blogsAtStart[0]
    
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const endResponse = await api.get('/api/blogs')
    const blogsAtEnd = endResponse.body
 
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length-1)
    })



after(async () => {
    await mongoose.connection.close()
  })
  