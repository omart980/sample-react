import React, { useState, useRef, useEffect } from 'react'; 
import TodoList from './TodoList'; 
import uuid from 'react-uuid' // generates random id

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  // 1st var calls todos, 2nd var updates todos ( render todos)
  const [todos, setTodos] = useState([]) // empty [] as default, no Todos until added
  const todoNameRef = useRef() // ref to input text

  useEffect(() => { 
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])// if empty, will not call this useEffect, but only once when reloaded

  // a func that takes parameter another func, used when something changes, call this first
  useEffect(() => { 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos)) // localStorage saves key/ value data, this case saves input
  }, [todos]) // array of properties (dependencies) determines when to call useEffect, hence if they change

  // saving changes of checked/ unchecked
  function toggleTodo(id){
    const newTodos = [...todos] // create a copy to not change current 
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
} // pass this now to the TodoList

function handleAddTodo(e){ //event property
  const name = todoNameRef.current.value
  if(name === '') return
  setTodos(prevTodos => { // prevTodos is a function call
    return [...prevTodos, {id: uuid(), name: name, complete: false}]
    // save prevTodos, and add these ( for render )
    // (spread syntax)...spread  this over our array, deconstruct into sepreate values 
  }) 
  todoNameRef.current.value = null // null clears previous value

}

function clearTodos(){
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}


return ( //use <> fragments to return one thing in multiple returns
  <> {/*{} means JS code*/}
    <TodoList todos ={todos} toggleTodo={toggleTodo}/> {/* Props (todos) and Components ( TodoList) */}
    <input ref={todoNameRef} type="text" /> {/* ref on html based on useRef hook -> will ref input text */}
    <button onClick={handleAddTodo}>Add Todo</button> {/* Adds todos */}
    <button onClick={clearTodos}>Completed Todo</button> {/* clesrs todos */}
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
  </>
  )
}

export default App;
