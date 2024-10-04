// update_expense.js
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
        const updatedExpense = await Expense.findByIdAndUpdate("6654ed3690c88dc9c55113b2", { description: "Office Supplies expense" });
        console.log(`Expense updated: ${updatedExpense.student_id} ${updatedExpense.category_id} ${updatedExpense.amount} ${updatedExpense.description} ${updatedExpense.date}`);
    } catch (e) {
        console.error(e);
    }
}
main().catch(console.error);
