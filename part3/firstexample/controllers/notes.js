const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({}).populate('user', { username:1, name:1 })
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if(note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.post('/', async (request, response) => {
  const body = request.body

  // const user = request.user
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
  // const user = request.user
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if(!user) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }

  // const note = await Note.findById(request.params.id)

  // if(!note){
  //   return response.status(400).json({ error: 'note not found' })
  // }

  // if(note.user.toString() === user.id.toString()){
  //   await Note.findByIdAndDelete(request.params.id)
  //   response.status(204).end()
  // }

})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new:true })
    .then(updateNote => {
      response.json(updateNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter