import React from 'react'
import Language from './Language'

const SpesificCountry = (props) => {

    props.function(props.country.capital)
    return (
      <div>
   <h1 class="title2">{props.country.name}</h1>
   <p>capital {props.country.capital}</p>
   <p> population {props.country.population}</p>
   <h1 class="title2">Spoken languages</h1>
   {props.country.languages.map(x=><Language key={x.name}language={x}/>)}
   <img src ={props.country.flag} alt='country flag' width="150"/>
   <h1 class="title2">Weather in {props.country.capital}</h1>
   <p>temperature: {props.weather.current.temp_c} celsius</p>
   <img src ={props.weather.current.condition.icon} alt='weather' width="150"/>
   <p>wind {props.weather.current.wind_mph} mph direction {props.weather.current.wind_dir} </p>
   </div>
    )
  
  
  
  }

  export default SpesificCountry