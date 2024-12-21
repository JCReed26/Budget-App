const ExpenseSchema = require("../models/expenseModel");


exports.addExpense = async (req, res) => {
    const {title, amount, type, date, category, description} = req.body;

    const income = ExpenseSchema({
        title, 
        amount,
        category,
        description,
        date
    })

    try {
        //validations 
        if (!title || !category || !description || !date) {
            return res.status(400).json({message: 'All fields are required'})
        }
        if (amount <= 0 ||  amount === 'number') {
            return res.status(400).json({message: 'Amount must be a positive number'})
        }
        await income.save()
        res.status(200).json({message: 'Expense added successfully'})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }

    console.log(income)
}

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params; 
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
        res.status(200).json({message: 'Expense deleted successfully'})
    })
    .catch((err) => {
        res.status(500).json({message: 'server error'})
    })
}