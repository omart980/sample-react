import React, { useState, useRef, useEffect } from 'react'; 
import TodoList from './TodoList'; 
import uuid from 'react-uuid' // generates random id

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  // 1st var calls todos, 2nd var updates todos
  const [todos, setTodos] = useState([]) 
  const todoNameRef = useRef()

useEffect(() => { 
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (storedTodos) setTodos(storedTodos)
}, [])

useEffect(() => { //whenever something changes, we call this function
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) //localStorage saves key/ value data
}, [todos])

function toggleTodo(id){
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}

function handleAddTodo(e){ //event property
  const name = todoNameRef.current.value
  if(name === '') return
  setTodos(prevTodos => {
    return [...prevTodos, {id: uuid(), name: name, complete: false}]
    // (spread syntax)...spread this over our array, deconstruct into sepreate values 
  }) 
  todoNameRef.current.value = null // null clears previous value

}

function clearTodos(){
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}


return ( //use <> fragments to return one thing in multiple returns
  <> 
    <TodoList todos ={todos} toggleTodo={toggleTodo}/> {/* Props (todos) */}
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={clearTodos}>Completed Todo</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
  </>
  )
}

export default App;


//https://www.youtube.com/watch?v=XMgNgEc94d8
