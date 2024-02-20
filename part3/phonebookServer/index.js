require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

const requestLogger = (request, resp0nse, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}


app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(requestLogger)

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(' :method :url :status :response-time ms - :body'))




// let persons = [
//     {
//         id: 1,
//         name: "Arto Hellas",
//         number: "040-123456"
//     },
//     {
//         id: 2,
//         name: "Ada Lovelace",
//         number: "39-44-532345"
//     },
//     {
//         id: 3,
//         name: "Dan Abramov",
//         number: "12-43-234345"
//     },
//     {
//         id: 4,
//         name: "Mary Poppendieck",
//         number: "39-23-6423122"
//     }
// ]

// 
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})


app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        const numberOfPeople = persons.length
        const date = new Date()
        response.send(`<div>
            <h2>Phonebook has info for ${numberOfPeople} people</h2>
            <p>${date}</p>
        </div>`)
    })
    
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     persons = persons.filter(person => person.id !== id)

//     response.status(204).end()
// })

// const generateId = () => {
//     const maxId = persons.length > 0
//         ? Math.max(...persons.map(p => p.id))
//         : 0
//     return maxId + 1
// }

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(body.name === undefined){
        return response.status(400).json({
            error: "name missing"
        })
    }

    if(body.number === undefined){
        return response.status(400).json({
            error: 'number missing'
        })
    }

    // const personFind = persons.find(person => person.name === body.name)

    // if(personFind){
    //     return response.status(400).json({
    //         error: "name must be unique"
    //     })
    // }

    const person = new Person({
        name : body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })

    // const person = {
    //     id: generateId(),
    //     name: body.name,
    //     number: body.number
    // }

    // persons = persons.concat(person)

    // response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3012
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})