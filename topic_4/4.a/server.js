/**
 * This is a simple Express server that implements a RESTful API for managing
 * expenses. The server listens on port 3000 and responds to the following
 * routes:
 *
 *   - GET /expenses: returns an array of all expenses
 *   - GET /expenses/:id: returns the expense with the given ID, or a 404 error
 *     if not found
 *   - POST /expenses: creates a new expense with a generated ID, using the
 *     description, amount, and category from the request body and returns the
 *     newly created expense with a 201 status code
 *   - PUT /expenses/:id: updates the expense with the given ID using the
 *     description, amount, and category from the request body and returns the
 *     updated expense
 *   - DELETE /expenses/:id: deletes the expense with the given ID and returns
 *     a 204 No Content response
 *
 * @module expenses-server
 */

const express = require('express'); // Import the Express library
const app = express(); // Create an Express application
const port = 3000; // Define the port number the server will listen on

app.use(express.json()); // Middleware to parse JSON bodies from incoming requests

/**
 * Array of expenses.
 *
 * @type {Array}
 */
let expenses = [
    { id: 1, description: 'Grocery shopping', amount: 50, category: 'Food' },
    { id: 2, description: 'Monthly rent', amount: 1200, category: 'Housing' },
    { id: 3, description: 'Gas for car', amount: 40, category: 'Transport' },
];

/**
 * Get all expenses.
 *
 * @name GET /expenses
 * @function
 * @memberof! module:expenses-server
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Array} The array of expenses.
 */
app.get('/expenses', (req, res) => {
    res.json(expenses);
});

/**
 * Get expense by ID.
 *
 * @name GET /expenses/:id
 * @function
 * @memberof! module:expenses-server
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object|Error} The expense object or a 404 error.
 */
app.get('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id); // Parse the ID from the URL
    const expense = expenses.find(e => e.id === id); // Find the expense by ID
    if (expense) {
        res.json(expense); // Return the expense if found
    } else {
        res.status(404).json({ message: 'Expense not found' }); // Return 404 if not found
    }
});

/**
 * Create a new expense.
 *
 * @name POST /expenses
 * @function
 * @memberof! module:expenses-server
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The newly created expense with a 201 status code.
 */
app.post('/expenses', (req, res) => {
    const newExpense = {
        id: expenses.length + 1, // Generate a new ID
        description: req.body.description, // Get the description from the request body
        amount: req.body.amount, // Get the amount from the request body
        category: req.body.category, // Get the category from the request body
    };
    expenses.push(newExpense); // Add the new expense to the list
    res.status(201).json(newExpense); // Return the newly created expense with a 201 status code
});

/**
 * Update an expense by ID.
 *
 * @name PUT /expenses/:id
 * @function
 * @memberof! module:expenses-server
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object|Error} The updated expense or a 404 error.
 */
app.put('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id); // Parse the ID from the URL
    const expense = expenses.find(e => e.id === id); // Find the expense by ID
    if (expense) {
        expense.description = req.body.description; // Update the expense's description
        expense.amount = req.body.amount; // Update the expense's amount
        expense.category = req.body.category; // Update the expense's category
        res.json(expense); // Return the updated expense
    } else {
        res.status(404).json({ message: 'Expense not found' }); // Return 404 if not found
    }
});

/**
 * Delete an expense by ID.
 *
 * @name DELETE /expenses/:id
 * @function
 * @memberof! module:expenses-server
 * @inner
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {undefined} No content is returned.
 */
app.delete('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id); // Parse the ID from the URL
    expenses = expenses.filter(e => e.id !== id); // Remove the expense from the list
    res.status(204).send(); // Return 204 No Content
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
