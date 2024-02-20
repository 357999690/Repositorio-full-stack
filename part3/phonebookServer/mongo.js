const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://lucaa20:${password}@cluster0.7qsrmix.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const name = process.argv[3]
    const number = process.argv[4]

    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })
    
    const Person = mongoose.model('Person', personSchema)
    
    const person = new Person({
        name: name,
        number: number,
    })

if(process.argv.length === 5){
    
    
    
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })

}

Person
    .find({})
    .then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            const nameAndnumber = `${person.name} ${person.number}`
            console.log(nameAndnumber)
        })

        mongoose.connection.close()
    })

// if(process.argv.length < 5){
//     console.log('give password as argument')
//     process.exit(1)
// }







