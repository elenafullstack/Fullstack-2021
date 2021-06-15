import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getPersons = () => {
   return axios.get(baseUrl)
}

const updatePersons = (newPerson) => {
   return axios.post(baseUrl, newPerson)
}

const deletePerson = (person) => {
 
   return axios.delete(`${baseUrl}/${person.id}`)
  

}


const updatePerson = (person, newPerson) => {
   return (axios.put(`${baseUrl}/${person.id}`, newPerson))
   

}

const personService =  { getPersons, updatePersons, deletePerson, updatePerson}

export default personService