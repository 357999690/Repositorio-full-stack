import React from "react";

const PersonForm = ({addPerson,newName,handlePersonChange,newNumber,handleNumberChange}) => {
    return(
        <div>
            <form onSubmit={addPerson}>
                <div>
                    <h2>add a new</h2>
                    name: <input
                        value={newName}
                        onChange={handlePersonChange}/>
                </div>
                <div>
                    number: <input
                        value={newNumber}
                        onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>

            </form>
        </div>
    )
}

export default PersonForm