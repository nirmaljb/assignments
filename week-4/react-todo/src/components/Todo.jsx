const Todo = ({title, description}) => {
    console.log('todo component is called')
    return <li>
        <h1>{title}</h1>
        <h4>{description}</h4>
    </li>
}

export default Todo