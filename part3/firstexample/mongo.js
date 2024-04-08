const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = 'mongodb+srv://lucaa20:LucasSimbron91@cluster0.7qsrmix.mongodb.net/testNotes?retryWrites=true&w=majority'

console.log('connecting to', url)


mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDb')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const testNoteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const TestNote = mongoose.model('TestNote', testNoteSchema)

const testNote = new TestNote({
  content: 'HTML is yu',
  important: true
})

testNote.save()
  .then(() => {
    console.log('note saved!')
    mongoose.connection.close()
  })