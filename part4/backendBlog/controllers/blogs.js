const blogsRouter = require('express').Router()
// const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
    // Blog.find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
    // if(blog){
    //     response.json(blog)
    // }else {
    //     response.status(404).end()
    // }
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ', '')
    }

    return null
}

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token , process.env.SECRET)
    if(!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id) 

    // const user = await User.findById(body.userId)

    // const user = request.user

    // const user = await User.findById(body.userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const blogSave = await blog.save()
    user.blogs = user.blogs.concat(blogSave._id)
    await user.save()

    response.status(201).json(blogSave)

    // blog.save()
    //     .then(savedBlog => {
    //         response.status(201).json(savedBlog)
    //     })
    //     .catch(error => next(error))
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if(!decodedToken) {
    //     return response.status(401).json({ error: 'token invalid' })
    // }
    

    const blog = await Blog.findById(request.params.id)

    if(!blog){
        return response.status(400).json( { error: 'Blog not found' })
    }

    if(blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    // await Blog.findByIdAndDelete(request.params.id)
    // response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    // const blog = {
    //     likes : body.likes,
    // }

    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, body, {new : true})
    response.json(updateBlog)
})

module.exports = blogsRouter