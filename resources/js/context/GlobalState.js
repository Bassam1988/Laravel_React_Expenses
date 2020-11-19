import React, { createContext, useReducer } from 'react';

import AppReducer from './AppReducer';


const initialState = {
    transactions: [
        { id: 1, cat_name: 'Flower', amount: 20, backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)' },
        { id: 2, cat_name: 'Car', amount: 300, backgroundColor: 'rgba(54, 162, 235, 0.2)', borderColor: 'rgba(54, 162, 235, 1)' },
        { id: 3, cat_name: 'Book', amount: 10, backgroundColor: 'rgba(255, 206, 86, 0.2)', borderColor: 'rgba(255, 206, 86, 1)' },
        { id: 4, cat_name: 'Camera', amount: 150, backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' }
    ],
    incomeTransactionsChart: [
        { id: 1, cat_name: 'Flower', amount: 20, backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)' },
        { id: 2, cat_name: 'Car', amount: 300, backgroundColor: 'rgba(54, 162, 235, 0.2)', borderColor: 'rgba(54, 162, 235, 1)' },
        { id: 3, cat_name: 'Book', amount: 10, backgroundColor: 'rgba(255, 206, 86, 0.2)', borderColor: 'rgba(255, 206, 86, 1)' },
        { id: 4, cat_name: 'Camera', amount: 150, backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' }
    ],
    expenseTransactionsChart: [
        { id: 1, cat_name: 'Fee', amount: 20, backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)' },
        { id: 2, cat_name: 'Salary', amount: 300, backgroundColor: 'rgba(54, 162, 235, 0.2)', borderColor: 'rgba(54, 162, 235, 1)' },
        { id: 3, cat_name: 'Bonus', amount: -10, backgroundColor: 'rgba(255, 206, 86, 0.2)', borderColor: 'rgba(255, 206, 86, 1)' },
        { id: 4, cat_name: 'Free', amount: 150, backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)' }
    ]
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    function getTransaction() {
        dispatch({
            type: 'GET_TRANSACTION',
            payload: user_id
        })
    }



    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            incomeTransactionsChart: state.incomeTransactionsChart,
            expenseTransactionsChart: state.expenseTransactionsChart,
            deleteTransaction,
            addTransaction,
            getTransaction
        }}>
            {children}
        </GlobalContext.Provider>


    )
}