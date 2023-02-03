import React, { useState, useEffect} from 'react'
import axios from 'axios'
import CountryForm from './components/CountryForm'
import Country from './components/Country'
import Countries from './components/Countries'
import './App.css';



const App = () => {

const [filter, setFilter] = useState('')
const [countries, setCountries] = useState ([])
const [weather, setWeather] = useState([])

const api_key = process.env.REACT_APP_API_KEY


const filterChange = (event) => {
  setFilter(event.target.value)
}

const hook = () => {
  axios.get('https://restcountries.com/v2/all')
  .then(response => {
    setCountries(response.data)
  })
}



    const weatherData=(city)=> {
       const params = {
         key: api_key,
         q: city
       }
       axios.get('https://api.weatherapi.com/v1/current.json', {params})
       
      .then (response => {
        setWeather(response.data)
      }, )
      
    }



useEffect(hook, [countries])
useEffect(()=>weatherData('London'), [])


 
const handleClick = (country) => {
  setFilter(country)
} 


const filterCountries = countries.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))

return (

<>
<div class="names">
  <h1 class="title">Country-app</h1>
  <div class="text"><p>Search countries by typing in the filter field. If only one match is found, the app shows the infromation of the found country and the current weather of the capital of the country</p></div>
</div>
  <div>
  <CountryForm value = {filter} onChange = {filterChange}/>

  <section class="container1">
    <Countries filter={filter} countries = {filterCountries} function={weatherData} weather= {weather} /> 
  </section>

  <section class="container2">
    <div class="countries">
    {filterCountries.map(x=><Country key = {x.name} countries={filterCountries} country={x} filter = {filter} function={handleClick}/>)}
    </div>
  </section>


  </div>
</>
)
 
}

export default App;