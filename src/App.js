import React, { useState, useRef, useEffect } from 'react'; // use state hook renders components
import TodoList from './TodoList'; // useRef allows us to ref elements inside our html
import uuid from 'react-uuid' //function that generates random id

const LOCAL_STORAGE_KEY = 'todoApp.todos'


function App() {
  // calling all todos inside our todo state
  // second variable is the function to call to update todos
  const [todos, setTodos] = useState([]) //object destructioring?
  // {id: 1, name: 'Todo 1', complete: false} cuz we do not want to start  with TODOs
  const todoNameRef = useRef()

useEffect(() => { 
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (storedTodos) 
    return setTodos(storedTodos)
}, [])

useEffect(() => { //whenever something changes, we call this function
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
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
    return [...prevTodos, {id: uuid(), name: name, defaultChecked: false}]/// ...spread this over our array
  })
  todoNameRef.current.value = null

}

function clearTodos(){
  const newTodos = todos.filter(todo => !todo.complete)
  setTodos(newTodos)
}


return ( //returns only return one thing, so use <> fragments to return one thing in multiple 
  <> 
    <TodoList todos ={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={clearTodos}>Completed Todo</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
  </>
  )
}

export default App;


//https://www.youtube.com/watch?v=XMgNgEc94d8
// Line 11: props?? 