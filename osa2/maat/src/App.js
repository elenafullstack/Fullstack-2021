import React, { useState, useEffect} from 'react'
import axios from 'axios'

const CountryForm = (props) => {
  return (
  <form>
    find countries: <input value={props.value} onChange = {props.onChange}/>
  </form>
  )
}

const Language = (props) => {
 return ( 
 <p> • {props.language.name} </p>
 )
}

const SpesificCountry = (props) => {

  props.function(props.country.capital)
  return (
    <div>
 <h1>{props.country.name}</h1>
 <p>capital {props.country.capital}</p>
 <p> population {props.country.population}</p>
 <h1>Spoken languages</h1>
 {props.country.languages.map(x=><Language key={x.name}language={x}/>)}
 <img src ={props.country.flag} alt='country flag' width="150"/>
 <h1>Weather in {props.country.capital}</h1>
 <p>temperature: {props.weather.current.temp_c} celsius</p>
 <img src ={props.weather.current.condition.icon} alt='weather' width="150"/>
 <p>wind {props.weather.current.wind_mph} mph direction {props.weather.current.wind_dir} </p>
 </div>
  )



}


const Country = (props) => {

  if (props.countries.length <= 10 && props.countries.length > 1 && props.filter !== '') {
  return (
  <div>
  <p>{props.country.name}</p>
  </div>
  )
} else {
  return null
}

}




const Countries = (props) => {

if (props.filter !== '')  {
   if(props.countries.length > 10) {
     return(<p>Too many matches, spesify another filter</p>)
   } else if (props.countries.length === 1) {
    return(props.countries.map(x=><SpesificCountry key={x.capital} country={x} function = {props.function} weather= {props.weather}/>))
   } else if (props.countries.length === 0) {
     return (<p>No countries</p>)
   } else {
     return null
   }

  } else {
    return null
  

}

}


const App = () => {

const [filter, setFilter] = useState('')
const [countries, setCountries] = useState ([])
const [weather, setWeather] = useState([])

const api_key = process.env.REACT_APP_API_KEY


const filterChange = (event) => {
  setFilter(event.target.value)
}

const hook = () => {
  axios.get('https://restcountries.eu/rest/v2/all')
  .then(response => {
    setCountries(response.data)
  })
}



    const weatherData=(city)=> {
       const params = {
         key: api_key,
         q: city
       }
       axios.get('http://api.weatherapi.com/v1/current.json', {params})
       
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
<div>
  
<CountryForm value = {filter} onChange = {filterChange}/>
<Countries filter={filter} countries = {filterCountries} function={weatherData} weather= {weather} /> 
{filterCountries.map(x=><Country key = {x.name} countries={filterCountries} country={x} filter = {filter} function={handleClick}/>)}


</div>
)
 
}

export default App;