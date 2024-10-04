// list_expenses.js
const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    student_id: mongoose.Schema.Types.ObjectId,
    category_id: mongoose.Schema.Types.ObjectId,
    amount: Number,
    description: String,
    date: { type: Date, default: Date.now }
});
const Expense = mongoose.model('Expense', expenseSchema);

async function main() {
    const uri = "mongodb+srv://iatd_student:TVgwGwaln3xxpGC5@cluster0.ef7iqvh.mongodb.net/iatd_student_expense_tracker"; // Replace with your MongoDB Atlas connection string
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB Atlas using Mongoose!");
        const expenses = await Expense.find({}, {_id: 0}); // exclude the _id field
        console.log("Expenses:");
        expenses.forEach(expense => {
            console.log(`${expense.student_id} ${expense.category_id} ${expense.amount} ${expense.description} ${expense.date}`);
        });
    } catch (e) {
        console.error(e);
    }
}
main().catch(console.error);
