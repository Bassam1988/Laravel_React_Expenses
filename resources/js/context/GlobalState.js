import React, { createContext, useReducer } from 'react';

import AppReducer from './AppReducer';


const initialState = {
    transactions: []
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

    function getTransaction(expenses) {
        dispatch({
            type: 'GET_TRANSACTION',
            payload: expenses
        })
    }



    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            
            deleteTransaction,
            addTransaction,
            getTransaction
        }}>
            {children}
        </GlobalContext.Provider>


    )
}