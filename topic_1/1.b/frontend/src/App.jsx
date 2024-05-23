import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5999/')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

    axios.get('http://localhost:5999/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const addItem = () => {
    axios.post('http://localhost:5999/items', { name: newItem })
      .then(response => {
        setItems([...items, response.data.name]);
        setNewItem('');
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
        <div>
          <input
            type="text"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Add new item"
          />
          <button onClick={addItem}>Add Item</button>
        </div>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
