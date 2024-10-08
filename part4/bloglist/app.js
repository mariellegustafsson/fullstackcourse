const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const Blog = require('./models/blog')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')



//const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(mongoUrl)


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter) 
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)





module.exports = app