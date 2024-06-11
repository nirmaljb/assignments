/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path')

const app = express();

app.use(bodyParser.json());

const directory = path.join(__dirname, 'todos.json')

app.get('/todos', (req, res) => {
  fs.readFile(directory, 'utf8', (err, data) => {
    const todos = JSON.parse(data)
    res.status(200).json(todos)
  })
})

app.get('/todos/:id', (req, res) => {
  const searchID = parseInt(req.params.id)
  fs.readFile(directory, 'utf8', (err, data) => {
    const todos = JSON.parse(data)
    const item = todos.filter((todo) => todo.id === searchID)

    if (item.length === 0) {
      res.status(404).json({msg: 'todo not found'})
    }else {
      res.status(200).json(item[0])
    }
  })
})

app.post('/todos', (req, res) => {
  const id = updateID()
  const title = req.body.title
  const description = req.body.description
  const completed = req.body.completed
  
  const todo = {id, title, description, completed}
  let todos = []
  fs.readFile(directory, 'utf8', (err, data) => {
    todos = JSON.parse(data)
    todos.push(todo)
    const jsonTodo = JSON.stringify(todos)
    
    fs.writeFile(directory, jsonTodo, (err) => {
      if(err) throw err;
      res.status(201).json(todo)
    })
  })
})

app.put('/todos/:id', (req, res) => {
  const searchID = parseInt(req.params.id)
  
  const newTodo = {
    id: searchID, 
    title: req.body.title, 
    description: req.body.description, 
    completed: req.body.completed
  }

  fs.readFile(directory, 'utf-8', (err, data) => {
    let todos = JSON.parse(data)
    const findElement = (element) => element.id === searchID
    const idx = todos.findIndex(findElement)

    if(idx === -1) {
      return res.status(404).json({
        msg: 'Todo not found' 
      })
    }
    todos.splice(idx, 1, newTodo)
    const response = JSON.stringify(todos)

    fs.writeFile(directory, response, (err) => {
      if(err) throw err;
    })
    res.status(200).json(todos)
  })
})

app.delete('/todos/:id', (req, res) => {
  const searchID = parseInt(req.params.id)
  fs.readFile(directory, 'utf8', (err, data) => {
    let todos = JSON.parse(data)

    const findElement = (element) => element.id === searchID
    const idx = todos.findIndex(findElement)

    if(idx === -1) {
      res.status(404).json({
        msg: 'Todo not found'
      })
    }else {
      todos.splice(idx, 1)
      const data = JSON.stringify(todos)
      fs.writeFile(directory, data, (err) => {
        if(err) throw err;      
        res.status(200).json({
          msg: 'Todo found and deleted'
        })
      })
    }
  })
})

app.use((error, req, res, next) => {
  res.status(404).json({
    msg: 'Something wrong happened'
  })
})

// app.listen(3000)


function updateID() {
  let todos = []
  fs.readFileSync(directory, 'utf-8', (err, data) => {
    todos = JSON.parse(data)
  })
  if(todos.length === 0) {
    return 1
  }else {
    return todos[todos.length - 1].id + 1
  }
}
module.exports = app;