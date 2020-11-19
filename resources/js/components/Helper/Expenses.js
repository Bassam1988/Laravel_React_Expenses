import React from 'react';
import axios from 'axios';

const Expenses = () => {
    const [expenses, setExpenses] = React.useState([]);
    React.useEffect(() => {
        axios.get('https://api.sanctum.test/api/book')
        .then(response => {
            setExpenses(response.data)
        })
        .catch(error => console.error(error));
    }, []);
    const expensesList = expenses.map((expense) => 
        <li key={expense.id}>{expense.amount}</li>
    );
    return (
        <ul>{expensesList}</ul>
    );
}

export default Expenses;