const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const Test = require('supertest/lib/test')

// const initialBlogs = [
//     {
//         title:1,
//         author:1,
//         url:1,
//         likes:1
//     },
//     {
//         title: 2,
//         author: 2,
//         url: 2,
//         likes: 2
//     },
// ]

// beforeEach(async () => {
//     await Blog.deleteMany({})

//     const blogObject = initialBlogs
//         .map(blog => new Blog(blog))
//     const promiseArray = blogObject.map(blog => blog.save())
//     await Promise.all(promiseArray)
// })

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is iniatilly some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await helper.blogsInDb()

        const titles = response.map(b => b.title)

        expect(titles).toContain(
            "1"
        )
    })
})

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: "3",
            author: "3",
            url: "3",
            likes: 3,
        }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain("3")
    })

    test('fails with status code 400 if data invalid', async () => {
        const newBlog = {
            author: "3",
            likes: 3,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if is a valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(b => b.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    // test('creation succeeds with a fresh username', async () => {
    //     const usersAtStart = await helper.usersInDb()

    //     const newUser = {
    //         username: 'mluukkai',
    //         name: 'Matti Luukkainen',
    //         password: 'salainen'
    //     }

    //     await api
    //         .post('/api/users')
    //         .send(newUser)
    //         .expect(201)
    //         .expect('Content-Type', /application\/json/)

    //     const usersAtEnd = await helper.usersInDb()
    //     expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    //     const usernames = usersAtEnd.map(u => u.username)
    //     expect(usernames).toContain(newUser.username)
    // })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

// test('all blogs are returned', async () => {
//     const response = await api.get('/api/blogs')

//     expect(response.body).toHaveLength(initialBlogs.length)
// })

// test('unique identifier call id', async () => {
//     const response = await api.get('/api/blogs')

//     expect(response.body[0].id).toBeDefined()
// })

// test('a valid blog can be added', async () => {
//     const newBlog = {
//         title: 3,
//         author:3,
//         url: 3,
//         likes: 3
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(201)
//         .expect('Content-Type', /application\/json/)

//     const blogsAtEnd = await api.get('/api/blogs')
//     expect(blogsAtEnd.body).toHaveLength(initialBlogs.length + 1)

//     const titles = blogsAtEnd.body.map(b => b.title)
//     expect(titles).toContain("3")
// })

// test('blog without likes, default zero', async () => {
//     const newBlog = {
//         title: 5,
//         author: 5,
//         url: 5,
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(201)

//     const blogsAtEnd = await api.get('/api/blogs')
//     const lastBlog = blogsAtEnd.body[2]
//     expect(lastBlog.likes).toBe(0)
// })

// test('blog without title or url is not added', async () => {
//     const newBlog = {
//         title: 4,
//         author: 4,
//         likes: 4,
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(400)

//     const blogsAtEnd = await api.get('/api/blogs')
//     expect(blogsAtEnd.body).toHaveLength(initialBlogs.length)
// }, 1000000)


//     test('succeeds with status code 204 if id is valid', async () => {
//         const blogsAtStart = await api.get('/api/blogs')
//         const blogToDelete = blogsAtStart.body[0]

//         await api
//             .delete(`/api/blogs/${blogToDelete.id}`)
//             .expect(204)

//         const blogsAtEnd = await api.get('/api/blogs')

//         expect (blogsAtEnd.body).toHaveLength(
//             initialBlogs.length - 1
//         )

//         const titles = blogsAtEnd.body.map(b => b.title)

//         expect(titles).not.toContain(blogToDelete.title)
//     })

//     test('update a blog', async () => {
//         const blogsAtStart = await  api.get('/api/blogs')
//         const blogToUpdate = blogsAtStart.body[0].id

//         const updateBlog = {
//             likes: 2,
//         }

//         const updateBlogs = await api
//         .put(`/api/blogs/${blogToUpdate}`)
//         .send(updateBlog)
        

    
//     expect(updateBlogs.body.likes).toBe(2)
//     })


afterAll(() => {
    mongoose.connection.close()
})