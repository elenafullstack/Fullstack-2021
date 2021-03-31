import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
   {text}
  </button>

)


const Statistics = ({good, neutral, bad}) => {

  if (good + neutral + bad > 0) {
  
  return (
    <div>
       <h1>Statistics</h1>
       <StaticsLine text= 'Good' value={good}/>
       <StaticsLine text= 'Neutral' value={neutral}/>
       <StaticsLine text= 'Bad' value={bad}/>
       <StaticsLine text= 'All' value={good + neutral + bad}/>
       <StaticsLine text= 'Average' value={ (good + -1 * bad) / (good + neutral + bad)}/>
       <StaticsLine text= 'Positive' value={good/(good+neutral+bad)*100 + '%'}/>
    </div>
   )
  }
    return (
      <div>
         <h1>Statistics</h1>
         <p>No feedback given</p>
      </div>
    )
  
}

  const StaticsLine = ({text,value}) => (
    <p>{text} {value}</p>
  )


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 

  return (
    <div>
      <h1>
      give feedback
      </h1>
     <Button handleClick ={() => setGood(good +1)} text ='good'/>
     <Button handleClick ={() => setNeutral(neutral +1)} text ='neutral'/>
     <Button handleClick ={() => setBad(bad +1)} text ='bad'/>
    <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    
    </div>
  )
}

export default App
