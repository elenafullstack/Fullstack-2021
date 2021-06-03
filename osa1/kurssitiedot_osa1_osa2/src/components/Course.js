import React from 'react'

const Course = (props) => {


    return (
      <div>
      <Header course = {props.course.name}/>
      {props.course.parts.map(x=> <Content key = {x.id} name = {x.name} exercises = {x.exercises} />)} 
       <Total exercises = {props.course.parts.map(x=>x.exercises)} /> 
       
      </div>
    )
  }
  
  const Header = (props) => {
    return (
      <div>
        <h1>
          {props.course}
        </h1>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
      <p>
        {props.name} {props.exercises}
        </p>
      
      </div>
    )
  }
  
  const Total = (props) => {
  
    return (
      <div>
      <p>
        total of exercises {props.exercises.reduce((accumulator, currentValue) => {
          return accumulator+ currentValue
        }, 0)}
      </p>
      </div>
    )
  }


  export default Course