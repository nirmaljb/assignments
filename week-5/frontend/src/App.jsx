import { useState } from 'react'
import { Card } from './components/Card'

function App() {
  const [count, setCount] = useState(['JavaScript', 'C++'])

  return (
    <>
      <Card name="Nirmal" description={"Senior Software Engineer"} interests={count} />
    </>
  )
}

export default App
