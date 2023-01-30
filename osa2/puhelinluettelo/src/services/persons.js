import axios from 'axios'
const baseUrl ='/api/persons'


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
   const request=  axios.put(`${baseUrl}/${person.id}`, newPerson)
   return request.then(response => response.data)
   

}

const personService =  { getPersons, updatePersons, deletePerson, updatePerson}

export default personService