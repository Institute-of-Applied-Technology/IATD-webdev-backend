import express, { json } from 'express';
import cors from 'cors'; // Import the cors package
import pkg from 'mongoose';
const { connect, connection, Schema, model, Types } = pkg;
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(json());

// MongoDB connection
connect(process.env.MONGODB_URI);

const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define Mongoose schemas and models
const studentSchema = new Schema({
    name: String,
    email: String,
    balance: Number,
});

const categorySchema = new Schema({
    name: String,
    description: String,
});

const expenseSchema = new Schema({
    student_id: Schema.Types.ObjectId,
    category_id: Schema.Types.ObjectId,
    amount: Number,
    description: String,
    date: Date,
});

const Student = model('Student', studentSchema);
const Category = model('Category', categorySchema);
const Expense = model('Expense', expenseSchema);


// Retrieve all students
app.get('/students', (req, res) => {
    Student.find({})
        .then(students => {
            res.json(students);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error retrieving students');
        });
});


// Retrieve a single student by student_id
app.get('/students/:studentId', (req, res) => {
    Student.findById(req.params.studentId)
        .then(student => {
            if (!student) {
                return res.status(404).send('Student not found');
            }
            res.json(student);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error retrieving student');
        });
});


// API endpoints

// 1. Add a new Expense for a Student ID
app.post('/expenses', async (req, res) => {
    const newExpense = new Expense({
        _id: new Types.ObjectId(),
        ...req.body,
    });
    try {
        await newExpense.save();
        console.log('Expense created:', newExpense);
        res.status(201).send(newExpense);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 2. Retrieve All Expenses for a Student ID
app.get('/expenses/student/:studentId', async (req, res) => {
    try {
        const studentExpenses = await Expense.find({ student_id: req.params.studentId });
        console.log(`Expenses for student ${req.params.studentId}:`, studentExpenses);
        res.status(200).send(studentExpenses);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 3. Retrieve an Expense for a Student ID & Expense ID
app.get('/expenses/:studentId/:expenseId', async (req, res) => {
    try {
        const expense = await Expense.findOne({ _id: req.params.expenseId, student_id: req.params.studentId });
        if (!expense) {
            return res.status(404).send({ error: 'Expense not found' });
        }
        console.log(`Expense ${req.params.expenseId} for student ${req.params.studentId}:`, expense);
        res.status(200).send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 4. Update an expense for a Student ID & Expense ID
app.put('/expenses/:studentId/:expenseId', async (req, res) => {
    try {
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: req.params.expenseId, student_id: req.params.studentId },
            req.body,
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).send({ error: 'Expense not found' });
        }
        console.log(`Expense ${req.params.expenseId} for student ${req.params.studentId} updated:`, updatedExpense);
        res.status(200).send(updatedExpense);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 5. Delete an expense for a Student ID & Expense ID
app.delete('/expenses/:studentId/:expenseId', async (req, res) => {
    try {
        const deletedExpense = await Expense.findOneAndDelete({ _id: req.params.expenseId, student_id: req.params.studentId });
        if (!deletedExpense) {
            return res.status(404).send({ error: 'Expense not found' });
        }
        console.log(`Expense ${req.params.expenseId} for student ${req.params.studentId} deleted:`, deletedExpense);
        res.status(200).send(deletedExpense);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


