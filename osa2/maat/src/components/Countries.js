import React from 'react'
import SpesificCountry from './SpesificCountry'



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

    export default Countries