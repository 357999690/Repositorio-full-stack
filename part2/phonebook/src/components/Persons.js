import React from "react";

const Persons = ({filterName, persons, handlePersonDelete}) => {
    const personsFilter = () => filterName.length > 0
        ?persons.filter((person) => person.name.toLowerCase().startsWith(filterName.toLowerCase()))
        : persons

    const filter = personsFilter().map((person, i) => (
        <div key={i}>
            <li>{person.name} {person.number}</li>
            <button onClick={() => handlePersonDelete(person.name, person.id)}>delete</button>
        </div>
        
    ))

    return filter
}

export default Persons