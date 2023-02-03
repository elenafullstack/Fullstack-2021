import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css';


const BadError = (props) => {
  if (props.message !== null && props.message !== '') {
    return (
      <div className = "baderror">
     <p>{props.message}</p>
     </div>
    )
}  else {
  return(
    <div className = "nothing">
    <p>{props.message}</p>
    </div>
  )
}
}

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

const Empty = (props) => {
  if (props.array.length == 0 ) {
    return (
      <div>
        <p>
          No numbers
        </p>
      </div>
    )
    } else {
      return (
        <>
        </>
      )
    }
  }

const Person = (props) => {

 return (
     <div> <p> {props.person.name}	&nbsp;&nbsp;&nbsp;{props.person.number}</p> <button onClick = {()=>props.function(props.person)}> Delete </button> </div>
 )
}

const FilterForm = (props) => {
  return (
  <form>
    <h2>Filter shown with:</h2> <input type="text"value={props.value} onChange = {props.onChange} placeholder="Type filter..."/>
  </form>
  )
}

const PersonForm = (props) => {

  let disable = true

console.log(props.value)
console.log(props.value2)

  if (props.value !== '' && props.value2 !== '') {
    disable = false
  }

  {console.log(disable)}
    
  return (
    <form onSubmit={props.addFunction}> 
       <h2>Add a new contact</h2>
          <div> <span>Name:</span> <input type="text"value={props.value} onChange={props.onChange} placeholder="Type name..."/></div>
          
          <div><span>Number:</span><input type="tel"value={props.value2} onChange={props.onChange2} placeholder="Type number..."/>  </div>
          <button type="submit" disabled={disable} id="btn" >Add contact</button>
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
  const [otherTimeout, setOtherTimeout] = useState('')
  const [badError, setBadError] = useState('')

  let filterNames=persons
  
 
  

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
      personService.updatePerson(old,nameObject).then(response => {
      response !== null ?  setPersons(persons.map(x => x.id !== old.id ? x : response)) :  new Error(response)
        setNewTimeout(clearTimeout(newTimeout))
        setError(`${newName}'s number is updated`)
        setNewTimeout(setTimeout(() => { setError(null) }, 5000))
        callTimeout(newTimeout)
        }).
        
        catch(error=>{
          if (error.response !== undefined) {
            setOtherTimeout(clearTimeout(otherTimeout))
            setBadError(`${error.response.data}`)
              setOtherTimeout(setTimeout(() => {setBadError(null) }, 5000))
              callTimeout(otherTimeout)
          } else {
            const newPersons = persons.filter(x => x.id !== old.id)  
            setPersons(newPersons)
            console.log(newPersons)
            console.log(persons)
            setOtherTimeout(clearTimeout(otherTimeout))
            setBadError(`Information of ${nameObject.name} has already been removed from the server`)
            setOtherTimeout(setTimeout(() => {setBadError(null) }, 5000))
            callTimeout(otherTimeout)
          }  
              
        })

    }
    }  else {

        personService.updatePersons(nameObject)
        .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setNewTimeout(clearTimeout(newTimeout))
        setError(`${newName} is added to the phonebook!`)
        setNewTimeout(setTimeout(() => { setError(null) }, 5000))
        callTimeout(newTimeout)
    

        }).catch(error=> {
          setNewTimeout(clearTimeout(newTimeout))
           setBadError(`${error.response.data}`)
            setOtherTimeout(setTimeout(() => {setBadError(null) }, 5000))
            callTimeout(newTimeout)

        })

    }
}


  const deleteSomeone = (person) => {
    if ((window.confirm(`Delete ${person.name}?`))) {
      personService.deletePerson(person).then(response=>response.data)
      const newPersons = persons.filter(x => x.id !== person.id)  
      setPersons(newPersons)
      console.log(persons)
      setNewTimeout(clearTimeout(newTimeout))
      setError( `${person.name} is deleted from the phonebook!`)
      setNewTimeout(setTimeout(() => { setError(null)}, 5000))
      callTimeout(newTimeout)
    }  
   
  }

 newFilter !== "" ? filterNames = persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase())) : filterNames=persons



  return (

  
  
    <body>
    <h2 class="title">PHONEBOOK</h2>

    <h3 class="titletext">
      In this application you can add, update and delete contacts for phonebook. The phone number must be at least 8 characters long and the name must have at least 3 letters. If you want to update the number of a contact, it is done by adding the contact again to the phonebook with a different number. This makes the application to ask you if you wish to update the contact
    </h3>
  
  
      <div class="container1">


        <div>
          <div>
            <FilterForm value = {newFilter} onChange = {handleFilterChange}/>
          </div>
          <PersonForm addFunction = {addPerson} value={newName} onChange = {handleNameChange} value2 = {newNumber} onChange2= {handleNumberChange} />
          <Error message = {newError}/>
        </div>


        <div>
          <h2>Numbers</h2> 
          <div class="numbers">
            <div>
              <Empty array = {filterNames}/>
              {filterNames.map(x=> <Person key= {x.name} person = {x} function = {deleteSomeone}/>)}
            </div>
          </div>
            <BadError message = {badError}/>
        </div>


      </div>

      <footer>
        <h3> © Elena Rima 2023</h3>
      </footer>

    </body>
  )

  
}

export default App