import { useState } from 'react'

const Feedback = (props) => {
    console.log(props)
    return (
        <div>
            <p>{props.name}{props.feedback}</p>
        </div>    )}

const Display = (props) => {
    console.log(props)
    return (
        <div>
          <Feedback name = {props.goodName} feedback = {props.good} />
          <Feedback name = {props.neutralName} feedback = {props.neutral}/>
          <Feedback name = {props.badName} feedback = {props.bad}/>
          <Feedback name = {props.allName} feedback = {props.allFeed}/>
          <Feedback name = {props.avgName} feedback = {props.avg} />
          <Feedback name = {props.posRatioName} feedback = {props.posRatio + "%"}/>

        </div>    )}

const Button = (props) => (
    <button onClick={props.onClick}>
        {props.text}
    </button>    )

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const allFeed = (good + bad + neutral)
  const avg = ((good * 1) + (neutral * 0) + (bad * -1)) / allFeed
  const posRatio = ((good / allFeed) * 100)

  const setToGood = newGood => {
      console.log('good now', newGood)
      setGood(newGood)}
  const setToNeutral = newNeutral => {
      console.log('neutral now', newNeutral)
      setNeutral(newNeutral)}
  const setToBad = newBad => {
        console.log('bad now', newBad)
        setBad(newBad)}


  return (
    <div>
        <h2>give feedback</h2>
        <Button onClick={() => setToGood(good + 1)} text="good" />
        <Button onClick={() => setToNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setToBad(bad + 1)} text="bad" />
        <h2>statistics</h2>
        <Display goodName = "good " good = {good} neutralName = "neutral " neutral = {neutral} badName = "bad " bad = {bad}
         allName = "all "  allFeed = {allFeed} avgName = "average " avg = {avg} posRatioName = "positive " posRatio = {posRatio}/>

    </div>
  )
}

export default App