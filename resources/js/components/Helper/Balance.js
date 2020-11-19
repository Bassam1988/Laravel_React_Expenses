import React, { useContext } from 'react';



export const Balance = ({ transactions }) => {


    const income = transactions
        .filter(item => item.expenseType == 0)
        .reduce((acc, item) => (acc += item.amount), 0)
        .toFixed(2);

    const expense = (
        transactions.filter(item => item.expenseType > 0).reduce((acc, item) => (acc += item.amount), 0) 
    ).toFixed(2);

    const total = (income - expense).toFixed(2);

    return (
        <>
            <h1>
                Your Balance
            </h1>

            <h4>
                ${total}
            </h4>
        </>
    )
}