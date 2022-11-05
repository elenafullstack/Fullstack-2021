import React from 'react'
import '../styles/Country.css';

const Country = (props) => {

    if (props.countries.length <= 10 && props.countries.length > 1 && props.filter !== '') {
    return (
    <div class="country">
      
             <p>{props.country.name}</p>
    </div>
    )
  } else {
    return null
  }
  
  }

  
  export default Country