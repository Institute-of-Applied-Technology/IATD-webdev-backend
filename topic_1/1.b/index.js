const express = require('express');
const cors = require('cors');

const app = express();
const port = 5999;

// Middleware
app.use(cors());
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Welcome to IATD 2024!');
});

// Array to store items
let items = [];

// Route to get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Route to add a new item
app.post('/items', (req, res) => {
  const newItem = req.body.name;
  items.push(newItem);
  res.status(201).json({ name: newItem });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});