import React from 'react'
import '../styles/CountryForm.css';

const CountryForm = (props) => {
    return (
    <div class="formContainer">
      <form>
        Find countries: <input value={props.value} onChange = {props.onChange}/>
      </form>
    </div>
    )
  }

  export default CountryForm