const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')



//const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(mongoUrl)


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)


module.exports = app