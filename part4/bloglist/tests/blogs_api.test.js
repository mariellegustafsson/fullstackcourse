const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)



test.only('there are five blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 5)
  })
  

test.only("the unique identifier is named id", async () =>{
    const response = await api.get('/api/blogs')
    assert.strictEqual((Object.keys(response.body[0]))[4], "id")
})



after(async () => {
    await mongoose.connection.close()
  })
  