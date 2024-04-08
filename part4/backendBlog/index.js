const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const PORT = process.env.PORT || 3017

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})


// const express = require('express')

// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')





// mongoose.set('strictQuery', false)
// mongoose.connect('mongodb+srv://lucaa20:LucasSimbron91@cluster0.7qsrmix.mongodb.net/blogs?retryWrites=true&w=majority')
//     .then(() => {
//         console.log('connected to MongoDb')
//     })
// const requestLogger = (request, response, next) => {
//     console.log('Method: ', request.method)
//     console.log('Path: ', request.path)
//     console.log('Body: ', request.body)
//     console.log('---')
//     next()
// }

// app.use(cors())
// app.use(express.json())
// app.use(requestLogger)





// const unknownEndpoint = (request, response) => {
//     response.status(404).send({error: 'unknown endpoint'})
// }

// app.use(unknownEndpoint)

// const PORT = process.env.PORT || 3017
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })