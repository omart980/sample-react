import React from 'react'
import Todo from './Todo'

// for returning our TODO list
export default function TodoList( {todos, toggleTodo} ) {
  return (
    todos.map(todo => { //map all our todo
      // return compo., with key prop for unique rendering
      return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo}/>
    })
  )
}
