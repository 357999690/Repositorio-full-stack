const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "1",
        author: "1",
        url: "1",
        likes: 1,
    },
    {
        title: "2",
        auhtor: "2",
        url: "2",
        likes: 2,
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb,
}