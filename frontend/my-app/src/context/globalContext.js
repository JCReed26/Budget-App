import React, { useContext, useState } from 'react';
import axios from 'axios';


const BASE_URL = "http://localhost:5000/api/v1/";


const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpense] = useState([]);
    const [error, setError] = useState(null); 

    const addIncome = async (income) => {
        console.log("Income to submit: ", income);  
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) => {
                setError(err.response.data.message);
            })
        getIncomes();
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data);
        console.log(response.data);
    }

    const deleteIncome = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-income/${id}`)
        .catch((err) => {
            setError(err.response.data.message);
        })
        getIncomes();
    }

    const totalIncome = () => {
        let totalIncome = 0; 
        incomes.forEach((income) => {
            totalIncome += income.amount;
        })
        return totalIncome;
    }

    const addExpense = async (expense) => {
        console.log("Expense to submit: ", expense);
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
        .catch((err) => {
            setError(err.response.data.message);
        })
        getExpenses();
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        .catch((err) => {
            setError(err.response.data.message);
        })
        setExpense(response.data);
    }

    const deleteExpense = async (id) => {
        const response = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        .catch((err) => {
            setError(err.response.data.message);
        })
        getExpenses();
    }

    const totalExpenses = () => {
        let totalExpenses = 0; 
        expenses.forEach((expense) => {
            totalExpenses += expense.amount;
        })
        return totalExpenses;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt); 
        });
        return history.slice(0,3);
    }

    return (
        <GlobalContext.Provider value={
            {
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,
                addExpense,
                getExpenses,
                expenses,
                deleteExpense,
                totalExpenses,
                totalIncome,
                totalBalance,
                transactionHistory,
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}