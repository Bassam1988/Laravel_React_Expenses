import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { TransactionList } from '../../../components/Helper/TransactionList';
import { Balance } from '../../../components/Helper/Balance';
import { AddTransaction } from '../../../components/Helper/AddTransaction';

import { ChartComp } from '../../../components/Helper/ChartComp';
import RangeSlider from '../../../components/Helper/RangeSlider';
import Calendar from 'react-calendar';

import { DatePickerInput } from 'rc-datepicker';
import { Pagination } from 'react-laravel-paginex'


import 'react-calendar/dist/Calendar.css'
import 'rc-datepicker/lib/style.css';
import '../../../../css/app.css';



class Home2 extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {},
            userExpenses: {},
            userExpensesData: {},
            FilterUserExpense: {},
            isLoading: false,
            errors: null,
            success: 0,
            categories: {},
            successCat: 0,
            startDate: new Date(),
            startDateUsed: 0,
            endDate: new Date(),
            endDateUsed: 0,
            rangeValue: [],
            rangeUsed: 0,
            expenseValue: '',
            expenseUsed: 0,
            catValue: -1,
            catUsed: 0,

        }
        this.handleUserExpensesChange = this.handleUserExpensesChange.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.setExpenseType = this.setExpenseType.bind(this);
        this.setcat_name = this.setcat_name.bind(this);
        this.getRange = this.getRange.bind(this);
        this.refreshFilterElement = this.refreshFilterElement.bind(this);



    }

    refreshFilterElement() {
        this.setState({ FilterUserExpense: this.state.userExpensesData, startDateUsed: 0, startDate: new Date, endDateUsed: 0, endDate: new Date, catValue: 0, catUsed: 0, rangeUsed: 0, rangeValue: [100, 400], expenseUsed: 0, expenseValue: '' })
    }

    handleUserExpensesChange(newExpenses) {
        this.setState({ userExpenses: newExpenses })
        this.setState({ userExpensesData: newExpenses.data })
        this.setState({ FilterUserExpense: newExpenses.data })
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }// 4.1

    onChangeStartDate(jsDate, dateString) {
        this.setState({ startDate: dateString, startDateUsed: 1 });

        let expense = (
            this.state.userExpensesData.filter(item => item.created_at >= dateString))

        if (this.state.catUsed) {
            expense = (
                expense.filter(item => item.categories_id == this.state.catValue))
        }
        if (this.state.rangeUsed) {
            expense = (
                expense.filter(item => this.state.rangeValue[0] <= item.amount <= this.state.rangeValue[1]))
        }
        if (this.state.expenseUsed) {
            expense = (
                expense.filter(item => item.expenseType == this.state.expenseValue))
        }
        if (this.state.endDateUsed) {
            expense = (
                expense.filter(item => item.amount <= this.state.endDate))
        }
        this.setState({ FilterUserExpense: expense });
    }

    onChangeEndDate(jsDate, dateString) {
        this.setState({ endDate: dateString, endDateUsed: 1 });
        let expense = (
            this.state.userExpensesData.filter(item => item.created_at <= dateString))

        if (this.state.catUsed) {
            expense = (
                expense.filter(item => item.categories_id == this.state.catValue))
        }
        if (this.state.rangeUsed) {
            expense = (
                expense.filter(item => this.state.rangeValue[0] <= item.amount <= this.state.rangeValue[1]))
        }
        if (this.state.expenseUsed) {
            expense = (
                expense.filter(item => item.expenseType == this.state.expenseValue))
        }
        if (this.state.startDateUsed) {
            expense = (
                expense.filter(item => item.created_at >= this.state.startDate))

        }
        this.setState({ FilterUserExpense: expense });
    }

    setExpenseType(expenseType) {
        this.setState({ expenseValue: expenseType, expenseUsed: 1 })
        let expense = (
            this.state.userExpensesData.filter(item => item.expenseType == expenseType))

        if (this.state.catUsed) {
            expense = (
                expense.filter(item => item.categories_id == this.state.catValue))
        }
        if (this.state.rangeUsed) {
            expense = (
                expense.filter(item => this.state.rangeValue[0] <= item.amount <= this.state.rangeValue[1]))
        }
        if (this.state.startDateUsed) {
            expense = (
                expense.filter(item => item.created_at >= this.state.startDate))
        }
        if (this.state.endDateUsed) {
            expense = (
                expense.filter(item => item.amount <= this.state.endDate))
        }
        this.setState({ FilterUserExpense: expense });

    }

    setcat_name(catId) {
        this.setState({ catValue: catId, catUsed: 1 })
        let expense = (
            this.state.userExpensesData.filter(item => item.categories_id == catId))

        if (this.state.endDateUsed) {
            expense = (
                expense.filter(item => item.amount <= this.state.endDate))

        }
        if (this.state.rangeUsed) {
            expense = (
                expense.filter(item => this.state.rangeValue[0] <= item.amount <= this.state.rangeValue[1]))
        }
        if (this.state.expenseUsed) {
            expense = (
                expense.filter(item => item.expenseType == this.state.expenseValue))
        }
        if (this.state.startDateUsed) {
            expense = (
                expense.filter(item => item.created_at >= this.state.startDate))

        }
        this.setState({ FilterUserExpense: expense });
    }

    getRange(rangeValue1) {

        this.setState({ rangeValue: rangeValue1, rangeUsed: 1 })
        let expense = (
            this.state.userExpensesData.filter(item => item.amount <= rangeValue1[1]))

        expense = (
            expense.filter(item => item.amount >= rangeValue1[0]))

        if (this.state.endDateUsed) {
            expense = (
                expense.filter(item => item.created_at <= this.state.endDate))

        }
        if (this.state.catUsed) {
            expense = (
                expense.filter(item => item.categories_id == this.state.catValue))
        }
        if (this.state.expenseUsed) {
            expense = (
                expense.filter(item => item.expenseType == this.state.expenseValue))
        }
        if (this.state.startDateUsed) {
            expense = (
                expense.filter(item => item.created_at >= this.state.startDate))

        }
        this.setState({ FilterUserExpense: expense });
    }

    componentDidMount() {
        if (this.state.isLoggedIn) {
            this.getTransaction(this.state.user.id, this.state.user.access_token)
            this.getGategories()
        }
    }

    getGategories() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.user.access_token
        axios.get("/api/auth/GetCategories").then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                let categoriesVar = json.data.categories;
                this.setState({
                    categories: categoriesVar,

                    successCat: 1
                });
            }
            else {
                alert(`Our System Failed To Logout from Your Account!`);
            }
        })
    }

    SearchByFilter(userID, access_token) {
        let page = 1;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
        axios.get("/api/auth/userExpenses", { params: { 'user_id': userID, 'page': page } }).then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                let expenses = json.data.expenses;
                this.setState({
                    userExpenses: expenses,
                    userExpensesData: expenses.data,
                    FilterUserExpense: expenses.data,
                    isLoading: false,
                    success: 1
                });
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

    getTransaction(userID, access_token) {
        let page = 1;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
        axios.get("/api/auth/userExpenses", { params: { 'user_id': userID, 'page': page } }).then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                let expenses = json.data.expenses;
                this.setState({
                    userExpenses: expenses,
                    userExpensesData: expenses.data,
                    FilterUserExpense: expenses.data,
                    isLoading: false,
                    success: 1
                });
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

    render() {
        const userExpenses1 = this.state.FilterUserExpense
        const isLoading1 = this.state.isLoading
        const gotData = this.state.success;
        const categories1 = this.state.categories
        const gotData1 = this.state.successCat;

        return (
            <React.Fragment>
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} />
                <div>
                    <h1> Choose your filter</h1>
                    <table className="Tcontent">
                        <thead>
                            <tr>
                                <th rowSpan="5"> Amount Range</th>
                                <th rowSpan="5"> Expenses Type</th>
                                <th rowSpan="5"> Expenses categories</th>
                                <th rowSpan="5"> Start Date</th>
                                <th rowSpan="5"> End Date</th>
                            </tr>
                        </thead>
                        <tbody>


                            <tr>
                                <td rowSpan="5">
                                    <RangeSlider getRangeValue={this.getRange} />
                                </td>
                                <td rowSpan="5">
                                    <div className="radio" onChange={(e) => this.setExpenseType(e.target.value)}>
                                        <input type="radio" value="0" name="expType" /> Income  <br />
                                        <input type="radio" value="1" name="expType" /> Expense
                                    </div>
                                </td>
                                <td rowSpan="5">
                                    <div >
                                        <select className="custom-select custom-select-sm" onChange={(e) => this.setcat_name(e.target.value)}>
                                            {gotData1 ? (categories1.map(categorie =>
                                                (
                                                    <option className="dropdown-item" key={categorie.id} value={categorie.id} >{categorie.name}</option>))) : ""}
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <DatePickerInput
                                        onChange={this.onChangeStartDate}
                                        value={this.state.startDate}
                                        className='my-custom-datepicker-component'
                                    />
                                </td>
                                <td>
                                    <DatePickerInput
                                        onChange={this.onChangeEndDate}
                                        value={this.state.endDate}SearchByFilter
                                        className='my-custom-datepicker-component'
                                    />
                                </td>
                                <td>
                                    <div>
                                    <button type="button" className="btn btn-primary" onClick={this.refreshFilterElement}>SearchByFilter
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-repeat" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                                            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                                            Refresh
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={this.SearchByFilter}>Search</button>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                    {!isLoading1 ? (
                        gotData ?
                            (


                                <table className="Tcontent">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Balance transactions={userExpenses1} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table className="Tcontent">
                                                    <tbody>

                                                        <tr>
                                                            <td>
                                                                <TransactionList transactions={this.state.userExpenses}
                                                                    handlerChange={this.handleUserExpensesChange} user={this.state.user} />
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td>
                                                <ChartComp transactions={userExpenses1} />
                                            </td>
                                            <td>
                                                <AddTransaction user={this.state.user} handlerChange={this.handleUserExpensesChange} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>




                            ) : ('')
                    ) : (
                            <p>Loading...</p>
                        )}
                </div>
            </React.Fragment >
        );
    }
} export default Home2