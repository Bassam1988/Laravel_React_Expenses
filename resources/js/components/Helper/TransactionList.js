import React, { useState } from 'react'

import { Transaction } from './Transaction';
import { Pagination } from 'react-laravel-paginex'
import { param } from 'jquery';
//import { GlobalContext } from '../../context/GlobalState';

export const TransactionList = ({ transactions, handlerChange, user, filterData }) => {

    // const {transactions}= useContext(GlobalContext);
    const [showupCat, setShowupCat] = useState(false)
    const [showdownCat, setShowdownCat] = useState(false)
    const [showupDate, setShowupDate] = useState(false)
    const [showdownDate, setShowdownDate] = useState(false)
    const [showupAmount, setShowupAmount] = useState(false)
    const [showdownAmount, setShowdownAmount] = useState(false)
    const [withSort1, setwithSort] = useState(0)
    const [page, setPage] = useState(1)
    //const onClick = () => setShowResults(true)
    function sortCat() {

        setShowdownAmount(false)
        setShowupAmount(false)
        setShowdownDate(false)
        setShowupDate(false)

        if (!showupCat && !showdownCat) {
            setShowupCat(true)
            setwithSort(1)
            getData(1, 1)
        }

        if (!showupCat && showdownCat) {
            setShowupCat(true)
            setShowdownCat(false)
            setwithSort(1)
            getData(1, 1)

        }
        if (showupCat && !showdownCat) {
            setShowdownCat(true)
            setShowupCat(false)
            setwithSort(10)
            getData(10, 1)

        }
    }

    function sortDate() {
        setShowdownCat(false)
        setShowupCat(false)
        setShowdownAmount(false)
        setShowupAmount(false)


        if (!showupDate && !showdownDate) {
            setShowupDate(true)
            setwithSort(2)
            getData(2, 1)

        }

        if (!showupDate && showdownDate) {
            setShowupDate(true)
            setShowdownDate(false)
            setwithSort(2)
            getData(2, 1)


        }
        if (showupDate && !showdownDate) {
            setShowdownDate(true)
            setShowupDate(false)
            setwithSort(20)
            getData(20, 1)

        }
    }

    function sortAmount() {

        setShowdownCat(false)
        setShowupCat(false)
        setShowdownDate(false)
        setShowupDate(false)


        if (!showupAmount && !showdownAmount) {

            setShowupAmount(true)
            setwithSort(3)
            getData(3, 1)
        }

        if (!showupAmount && showdownAmount) {
            setShowupAmount(true)
            setShowdownAmount(false)
            setwithSort(3)
            getData(3, 1)

        }
        if (showupAmount && !showdownAmount) {
            setShowdownAmount(true)
            setShowupAmount(false)
            setwithSort(30)
            getData(30, 1)

        }
    }

    /*    function getSortedData(withSort, column1, upOrDown1, page) {
    
            let userID = user.id;
            let access_token = user.access_token
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
            axios.get("/api/auth/userExpenses", { params: { 'user_id': userID, 'page': page, column: column1, upOrDown: upOrDown1 } }).then(response => {
                return response;
            }).then(json => {
                if (json.data.success) {
                    let expenses = json.data.expenses;
    
                    handlerChange(expenses)
                    setPage(expenses.page)
    
    
                } else {
                    alert(`Our System Failed To Logout from Your Account!`);
                }
            }).catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    let err = error.response.data;
    
                }
                else if (error.request) {
                    // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                    let err = error.request;
    
                } else {
                    // Something happened in setting up the request that triggered an Error
                    let err = error.message;
    
                }
            });
    
        }*/


    function getData(withSort, page) {

        let userID = user.id;
        let access_token = user.access_token

        let params = { 'user_id': userID, 'page': page }
        if (withSort != 0) {
            if (withSort == 1) {
                params = { 'user_id': userID, 'page': page, 'column': 'Categories_id', 'upOrDown': 'ASC' }
            }
            if (withSort == 10) {
                params = { 'user_id': userID, 'page': page, 'column': 'Categories_id', 'upOrDown': 'DESC' }
            }
            if (withSort == 2) {
                params = { 'user_id': userID, 'page': page, 'column': 'created_at', 'upOrDown': 'ASC' }
            }
            if (withSort == 20) {
                params = { 'user_id': userID, 'page': page, 'column': 'created_at', 'upOrDown': 'DESC' }
            }
            if (withSort == 3) {
                params = { 'user_id': userID, 'page': page, 'column': 'Amount', 'upOrDown': 'ASC' }
            }
            if (withSort == 30) {
                params = { 'user_id': userID, 'page': page, 'column': 'Amount', 'upOrDown': 'DESC' }
            }

        }

        if (filterData.filter) {
            
            params = Object.assign({}, params, filterData);
            console.log(filterData)
            console.log(params)
        }


        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
        axios.get("/api/auth/userExpenses", { params }).then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                let expenses = json.data.expenses;

                handlerChange(expenses)
                setPage(expenses.page)


            } else {
                alert(`Our System Failed To Logout from Your Account!`);
            }
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                let err = error.response.data;

            }
            else if (error.request) {
                // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                let err = error.request;

            } else {
                // Something happened in setting up the request that triggered an Error
                let err = error.message;

            }
        });

    }
    function FilterData(sort,page)
    {
        getData(sort,page)

    }


    return (
        <>
            <h1>
                History
        </h1>
        <button onClick={() => FilterData()} className="cat_but_sort">Search</button>
           
            <table className="table table-striped list">
                <thead>
                    <tr>
                        <th scope="col">
                            <button onClick={() => sortCat()} className="cat_but_sort">Category
                            {showdownCat ? (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down-short"
                                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                                </svg>) : null}
                                {showupCat ? (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
                                </svg>) : null}


                            </button>
                        </th>
                        <th scope="col">
                            <button onClick={() => sortDate()} className="cat_but_sort">Created Date
                            {showdownDate ? (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down-short"
                                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                                </svg>) : null}
                                {showupDate ? (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
                                </svg>) : null}


                            </button>
                        </th>
                        <th scope="col">
                            <button onClick={() => sortAmount()} className="cat_but_sort">Amount
                            {showdownAmount ? (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down-short"
                                    fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" />
                                </svg>) : null}
                                {showupAmount ? (<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
                                </svg>) : null}


                            </button>
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {transactions.data.map(transaction => (<Transaction key={transaction.id} transaction={transaction} handlerChange={handlerChange} />))}

                </tbody>
            </table>
            <Pagination changePage={(e) => getData(withSort1, e.page)} data={transactions} />
        </>
    )
}