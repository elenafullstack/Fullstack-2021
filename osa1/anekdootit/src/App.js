import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {


  
  return (
   
    <button onClick={handleClick}>
     {text}
   </button>

  )

}

const Statistics = ({anecdotes,selected,points,mostVoted}) => {

  return (
  <div>
  <p>{anecdotes[selected]}</p>
  <p>has {points[selected]} points</p>
  {console.log(points)}
  <h1>Anecdote with most votes</h1>
  <p>{anecdotes[mostVoted]}</p>
  </div>

  )
}




const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const vote = (number) =>  {
    let copy = [...points]
     copy[number] +=1
    setPoints(copy)
    const largest = Math.max(...copy) 
    const index = copy.findIndex(x => x === largest)
    setMostVoted(index)
   
     
 }
       
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  const [mostVoted, setMostVoted] = useState(0)
 
  return (
    <div>
      
      <Button handleClick ={()=> setSelected(Math.floor(Math.random() * 6) + 0)} text ='next anecdote'/>
      <Button handleClick ={() => vote(selected)} text ='vote'/>
      <Statistics anecdotes = {anecdotes} selected = {selected} points = {points} mostVoted = {mostVoted}/>
  
      
    </div>
  )
}

export default App