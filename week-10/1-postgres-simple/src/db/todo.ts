import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    const createQuery = `
        INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3);
    `

    const displayQuery = `
        SELECT * FROM todos WHERE user_id = $1;
    `

    await client.query(createQuery, [userId, title, description])
    const print = await client.query(displayQuery, [userId])
    
    return print.rows[0]
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    const updateQuery = `
        UPDATE todos
        SET done=true
        WHERE user_id=$1
    `

    const responseQuery = `
        SELECT * FROM todos WHERE user_id=$1;
    ` 

    await client.query(updateQuery, [todoId])
    const response = await client.query(responseQuery, [todoId])
    
    return response.rows[0]
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    const query = `
        SELECT * FROM todos WHERE user_id = $1
    `
    const response = await client.query(query, [userId])
    
    return response.rows;
}