import React from 'react'
import Todo from './Todo'

export default function TodoList( {todos, toggleTodo} ) {
  return (
    todos.map(todo => { //map all our todo
      return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo}/> // return a todo component
      // key are like ids that make this unique for rendering specific ones changed
    })
  )
}
