import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    const createQuery = `
        INSERT INTO users (username, password, name) VALUES ($1, $2, $3);
    `

    const response = await client.query(createQuery, [username, password, name])
    return response.rows[0]
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    const query = `
        SELECT * FROM users WHERE id = $1;
    `

    const response = await client.query(query, [userId])
    return response.rows[0]
}
