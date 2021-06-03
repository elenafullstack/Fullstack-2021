import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getPersons = () => {
   return axios.get(baseUrl)
}

const updatePersons = (newPerson) => {
   return axios.post(baseUrl, newPerson)
}

const deletePerson = (person) => {
 if (window.confirm(`Delete ${person.name}?`)) {
   const deleted = axios.delete(`${baseUrl}/${person.id}`)
   return deleted.then(response=>response.data)
} else {
   return false
}
}


const updatePerson = (person, newPerson) => {
   return axios.put(`${baseUrl}/${person.id}`, newPerson)
}

const personService =  { getPersons, updatePersons, deletePerson, updatePerson}

export default personService