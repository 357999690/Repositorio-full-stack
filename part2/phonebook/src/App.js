import React, {useState, useEffect} from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/persons'
import Notification from "./components/Notification";
import NotificationError from "./components/NotificationError";
import './index.css'


const App = () => {
  const[ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [message, setMessage] = useState(null)
  const [messageError, setMessageError] = useState(null) 

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const alreadyName = persons.find(person => person.name === newName)
    

    if(alreadyName){
      const changedPerson = {...alreadyName, number : newNumber}
      const nameExist = alreadyName.id 
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        
        personService
          .update(nameExist, changedPerson)
          .then(returnedPerson => {
           
            setPersons(persons.map(person => person.id !== nameExist ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(
              `Changed ${changedPerson.name} number`
            )
            setTimeout(() => {
              setMessage(null)
            },5000)
            
          })
          .catch(error => {
            setMessageError(`Information of ${changedPerson.name} has already been from serve`)
            setPersons(persons.filter(p => p.id !== nameExist))
            setTimeout(() => {
              setMessageError(null)
            }, 5000)
          })

          
      }
    }else{
      personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${newPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessageError(error.response.data.error)
        setTimeout(() => {
          setMessageError(null)
        }, 5000)
      })
    }

    
    
      
        
  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const handlePersonDelete = (name , id) => {
    return window.confirm (`Delete ${name}?`) ?
      personService.personDelete(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
          
         :
        null
  }
  
  

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <NotificationError messageError={messageError}/>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <Persons filterName={filterName} persons={persons} handlePersonDelete={handlePersonDelete}/>
    </div>
  )}

  export default App