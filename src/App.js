import './App.css';
import {useEffect, useState} from 'react';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import firebase from 'firebase';

function App() {
  // Short-term Memory -> empty when page refresh
  const [todos, setTodos] = useState([]); // useState hook
  const [input, setInput] = useState(''); // init
  console.log('test input: ', input); 
  console.log('test todos: ', todos); 
  
  // When the app loads, we need to listen to the database 
  // and fetch new todos at they get added/removed.
  useEffect(() => {
    // this code here... 
    // only one time fires when the ap.js loads 
    // attach to database just one time (it's enough, To attach every-single time is too stressful)
    
    // TODO: firestore 연동
    const q = query(collection(db, "todos"));
    onSnapshot(q, (querySnapshot) => {
      const firestoreData = [];
      querySnapshot.forEach((doc) => {
        firestoreData.push(doc.data().todo); // todos table's column todo
      });
      //setTodos([...todos, firestoreData]);
      setTodos(firestoreData);
      console.log("Current todos: ", firestoreData.join(", "));
    });
  }, []);

  // this will fire off when we click the button
  const addTodo = (event) => {
    // stop page refresh, because, when you use form tag, refresh page and memory after button click
    event.preventDefault();

    // Add a new document in collection "todos"
    const docRef = addDoc(collection(db, "todos"), {
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);
    
    // append input at todos
    setTodos([...todos, input]);

    // clear up the input, after submitting the form (clicking add todo button)
    setInput('');
    //setTodos('');
  }


  return (
    <div className="App">
      <h1>Hello</h1>
      <FormControl>
        <InputLabel>Write a Todo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)} />
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add TODO
        </Button>
      </FormControl>

      <ul>
        {todos.map(todo => (
          <Todo text={todo} />
          //<li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
