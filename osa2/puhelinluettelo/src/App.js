import React, { useState, useEffect } from 'react'
import personService from './services/persons'




const Error = (props) => {

  if (props.message !== null && props.message !== '') {
 return (
   <div className = "error">
  <p>{props.message}</p>
  </div>
 )
  } else {
    return(
      <div className = "nothing">
      <p>{props.message}</p>
      </div>
    )
  }
}

const Person = (props) => {

 return (
      <p> {props.person.name} {props.person.number} <button onClick = {()=>props.function(props.person)}> delete </button></p> 
 )
}

const FilterForm = (props) => {
  return (
  <form>
    filter shown with: <input value={props.value} onChange = {props.onChange}/>
  </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addFunction}> 
    <div>
      name: <input 
      value={props.value}
      onChange={props.onChange}/>
      </div>
      <div>number:<input value={props.value2}
      onChange={props.onChange2} />
      </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState ([])

  const hook = () => {
    personService.getPersons()
    .then(response => {
      setPersons(response.data)
    
    })
  }

  useEffect(hook, [])

  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newError, setError] = useState('')
  const [newTimeout, setNewTimeout] = useState('')


  const callTimeout = (timeout) => {
      return timeout
    }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
   
  }

  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    const already = persons.filter(x => x.name === newName)
   

  if(already.length === 1) {
    const old = already[0]
    if ( window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      nameObject.id = old.id
      personService.updatePerson(old,nameObject)
      
      const newPersons = persons.map(x => x.id === old.id ? nameObject : x)
      setPersons(newPersons)
      setNewTimeout(clearTimeout(newTimeout))
      setError(
        `${newName}'s number is updated`)
      setNewTimeout(setTimeout(() => {
        setError(null)
      }, 5000))
      callTimeout(newTimeout)
    }
  } else {
    personService.updatePersons(nameObject)
    .then(response => {
    setPersons(persons.concat(response.data))
    setNewTimeout(clearTimeout(newTimeout))
    setError(
      `${newName} is added to the phonebook`)
    setNewTimeout(setTimeout(() => {
      setError(null)
    }, 5000))
    callTimeout(newTimeout)
    setNewName('')
    setNewNumber('')
   
    })
  
   }

 }

  const deleteSomeone = (person) => {
    if (personService.deletePerson(person)) {
     const newPersons = persons.filter(x => x.id !== person.id)  
    setPersons(newPersons)
    setNewTimeout(clearTimeout(newTimeout))
    setError(
      `'${person.name}' is deleted from the phonebook`)
     setNewTimeout(setTimeout(() => {
      setError(null)
    }, 5000))
    callTimeout(newTimeout)
    }  
   
  }


  const filterNames = persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm value = {newFilter} onChange = {handleFilterChange}/>
      <h2>add a new</h2>
     <PersonForm addFunction = {addPerson} value={newName} onChange = {handleNameChange} value2 = {newNumber} onChange2= {handleNumberChange}/>
      <h2>Numbers</h2> 
       {filterNames.map(x=> <Person key= {x.name} person = {x} function = {deleteSomeone}/>)}
       <Error message = {newError}/>
    </div>
  )

}

export default App