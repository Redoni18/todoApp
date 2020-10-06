import React, {useState, useEffect} from 'react';
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

function App() {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('');

  // kur te hapet website-i, duhet me shiku databazen edhe me i morr te dhenat
  // ose me i fshi prej databazes varesisht prej qka don me bo perdoruesi
  useEffect(() => {
    //kjo pjese e kodit ekzekutohet kur te haper website-i
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, [])
  
  const addTodo = (Event) =>{
    //funksioni ekzekutohet kur te klikohet butoni
    Event.preventDefault(); //nuk e bon refresh faqen nese shton sene tu e kliku enter
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
     setTodos([...todos, input]);//i shton senet ne liste
     setInput(''); //e pastron inputin
  }

  return (
    <div className="App">
      <h1>Todo App</h1>

      <form>
      <FormControl>
        <InputLabel>Write a todo</InputLabel>
        <Input value={input} onChange={Event => setInput(Event.target.value)} />
      </FormControl>
        <Button startIcon={<AddCircleRoundedIcon />} disabled={!input} variant="contained" color="primary" type='submit' onClick={addTodo}>
          Add Todo
        </Button>
      </form>
      

      <ul>
        {todos.map(todo => (
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
