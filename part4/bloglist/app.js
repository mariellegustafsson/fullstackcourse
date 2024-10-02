const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const config = require('./utils/config')
const logger = require('./utils/logger')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(mongoUrl)


app.use(cors())
app.use(express.json())


module.exports = app
