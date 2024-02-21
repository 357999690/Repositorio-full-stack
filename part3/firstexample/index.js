require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
// const mongoose = require('mongoose')
const Note = require('./models/note')
const e = require('express')



app.use(express.static('build'))
app.use(cors())
app.use(express.json())


// const password = process.argv[2]

// const url = `mongodb+srv://lucaa20:${password}@cluster0.7qsrmix.mongodb.net/noteApp?retryWrites=true&w=majority`

// mongoose.set('strictQuery', false)
// mongoose.connect(url)


// const noteSchema = new mongoose.Schema({
//     content:String,
//     important: Boolean,
// })

// noteSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

// const Note = mongoose.model('Note', noteSchema)

// let notes = [
//     {
//         id: 1,
//         content: 'HTML is easy',
//         important: true
//     },
//     {
//         id: 2,
//         content: 'Browser can execute only Javascript',
//         important: false
//     },
//     {
//         id:3,
//         content:'GET and POST are the most important methods of HTTP protocol',
//         important: true
//     }
// ]

app.get('/',(request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes',(request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
        
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                
                    response.json(note)
                
            }else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// app.get('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
    
//     const note = notes.find( note => note.id === id
        
        
//     )
    
//     if(note){
//         response.json(note)
//     }else{
//         response.status(404).end()
//     }
// })


app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if(body.content === undefined){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note( {
        content: body.content,
        important: body.important || false,
        
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })

    

    
    
})

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(request.params.id, note, {new: true})
        .then(updateNote => {
            response.json(updateNote)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
