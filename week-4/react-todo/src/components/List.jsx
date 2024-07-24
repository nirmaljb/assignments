import { memo } from "react"
import Todo from "./Todo";

const List = memo(({todos}) => {
    console.log('called the list comp')
    return <ul>
        {todos.map(todo => <Todo key={todo.id} title={todo.title} description={todo.description} />)}
    </ul>
})

export default List