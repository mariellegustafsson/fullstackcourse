import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>

)
const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

  const Statistics = ({numbers}) => {
      
  const total = numbers[0] + numbers[1] + numbers[2]
  const average = (numbers[0]*1 + numbers[1]*0 + numbers[2]*(-1))/total
  const percentage = 100*numbers[0]/total

  if (total == 0){
    return (
    <div> No feedback given </div>
    )
  }
  else{
    return(
      <table>
        <tbody>
        <StatisticLine text="good" value ={numbers[0]} />
        <StatisticLine text="neutral" value ={numbers[1]} />
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={percentage + "%"}/>
        </tbody>
        </table>
        
    )
  }
  }


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const values = [good, neutral, bad]

  return (
    <div>
      <h1> give feedback </h1>
      
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      
      <h1> statistics </h1>
      < Statistics numbers = {values} />
    </div>
  )
}

export default App