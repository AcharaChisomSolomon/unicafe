import { useState } from "react";

const Button = props => {
  const { text, handler } = props
  
  return <button onClick={handler}>{ text }</button>
}

const Buttons = props => {
  const { gHandler, nHandler, bHandler } = props
  
  return (
    <div>
      <Button text='good' handler={gHandler} />
      <Button text='neutral' handler={nHandler} />
      <Button text='bad' handler={bHandler} />
    </div>
  );
}

const Statistic = props => {
  const { text, value } = props

  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === "positive" ? "%" : ""}
      </td>
    </tr>
  );
}

const Statistics = props => {
  const { gVal, nVal, bVal } = props
  const total = gVal + nVal + bVal

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={gVal} />
        <Statistic text="neutral" value={nVal} />
        <Statistic text="bad" value={bVal} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={(gVal + bVal * -1) / total || 0} />
        <Statistic text="positive" value={(gVal / total) * 100 || 0} />
      </tbody>
    </table>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <main>
      <h1>give feedback</h1>
      <Buttons
        gHandler={handleGood}
        nHandler={handleNeutral}
        bHandler={handleBad}
      />
      <h2>statistics</h2>
      <Statistics gVal={good} nVal={neutral} bVal={bad} />
    </main>
  );
};

export default App;
