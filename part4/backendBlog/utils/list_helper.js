const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0){
        return 0
    }

    if(blogs.length === 1){
        return blogs[0].likes
    }

    const likes = blogs.map(like => like.likes)
    
    const reducer = (sum, item) => {
        return sum + item
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const allLikes = blogs.map(blog => blog.likes)
    
    const max = Math.max(...allLikes)

    const favoriteBlogs = blogs.find( blog => blog.likes === max)
    
    return favoriteBlogs
}

// const mostBlogs = (blogs) => {
//     const allLikes = blogs.map(blog => blog.likes)

//     const max = Math.max(...allLikes)

//     const favoriteBlog = blogs.find(blog => blog.likes === max)

//     const result = {
//         author: favoriteBlog.author,

//     }
// }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}