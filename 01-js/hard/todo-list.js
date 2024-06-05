/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.store = []
  }

  add(item) {
    this.store.push(item)
  }

  remove(indexOfTodo) {
    this.store.splice(indexOfTodo, 1)
  }

  update(index, updatedTodo) {
    if (index < this.store.length) {
      this.store[index] = updatedTodo
    }
  }

  getAll() {
    return this.store
  }

  get(indexOfTodo) {
    if(indexOfTodo > this.store.length - 1) {
      return null
    }
    return this.store[indexOfTodo]
  }

  clear() {
    this.store.length = 0
  }

}

module.exports = Todo;
