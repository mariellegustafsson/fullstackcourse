const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)



test.only('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
  })
  

test.only("the unique identifier is named id", async () =>{
    const response = await api.get('/api/blogs')
    assert.strictEqual((Object.keys(response.body[0]))[4], "id")
})

test.only("a new blogpost can be created", async () => {

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


after(async () => {
    await mongoose.connection.close()
  })
  