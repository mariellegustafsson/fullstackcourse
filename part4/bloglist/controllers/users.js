
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const Blog = require('../models/blog')

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)
    //const user = await User.findById(body.userId)
    const user = new User({
        username: username,
        name: name,
        passwordHash: passwordHash,


    })
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  })
  
  userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
  
  })
  module.exports = userRouter