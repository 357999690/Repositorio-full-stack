import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';

const Statistics = (props) => {
  return(
    <table>
      <tbody>
        <StatisticLine text={props.good} value={props.goodStatistic}/>
        <StatisticLine text={props.neutral} value={props.neutralStatistic}/>
        <StatisticLine text={props.bad} value={props.badStatistic}/>
        <StatisticLine text={props.all} value={props.allStatistic}/>
        <StatisticLine text={props.average} value={props.averageStatistic}/>
        <StatisticLine text={props.positive} value={props.positiveStatistic()}/>  
      </tbody>
    </table>
  )
} 

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return(
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const App = () => {

  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const all = good + bad + neutral
  const positive = () => {
    if(good >0){
      const porcen = good * 100 / all
      return `${porcen} %`
    }else{
      return 0
    }
  }
  const average = (good - bad) / all

  return(
    <>
      <h1>give feedback</h1>
      
      <Button onClick={handleGood} text={'good'}/>
      <Button onClick={handleNeutral} text={'neutral'}/>
      <Button onClick={handleBad} text={'bad'}/>
      
      <h2>statistics</h2>
      
        {all === 0
          ? <h2>No feedback given</h2>
          : <div>
             <Statistics good={'good'} goodStatistic={good}
                         bad = {'bad'} badStatistic = {bad}
                         neutral = {'neutral'} neutralStatistic = {neutral}      
                         all = {'all'} allStatistic = {all}
                         average = {'average'} averageStatistic = {average}
                         positive = {'positive'} positiveStatistic = {positive}
            />                  
          </div>}
      
      
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
