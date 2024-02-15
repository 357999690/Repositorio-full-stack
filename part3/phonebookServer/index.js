const express = require('express')
const app = express()
const morgan = require('morgan')

const requestLogger = (request, resp0nse, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
}




app.use(express.json())
app.use(requestLogger)

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(' :method :url :status :response-time ms - :body'))


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-532345"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const numberOfPersons = persons.length
    const date = new Date()
    response.send(`<div>
    <h2>Phonebook has info for ${numberOfPersons} people</h2>
    <p>${date}</p></div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id =Number(request.params.id)
    const person = persons.find(person => person.id === id)
    person
        ? response.json(person)
        : response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name){
        return response.status(400).json({
            error: "name missing"
        })
    }

    if(!body.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const personFind = persons.find(person => person.name === body.name)

    if(personFind){
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = 3010
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})