import { useState } from 'react'
import List from './components/List'

function App() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [todo, setTodo] = useState([])

  function addToTodo() {
    const id = Math.floor(Math.random() * 100) + 1
    const response = {
      id,
      title,
      description: desc
    }

    console.log(response)
    setTodo([...todo, response])
  }

  return (
    <>
      title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <br></br>
      description: <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)}/>
      <br></br>
      <button onClick={addToTodo}>Append</button>
      <br></br>
      <List todos={todo} />
    </>
  )
}

export default App
