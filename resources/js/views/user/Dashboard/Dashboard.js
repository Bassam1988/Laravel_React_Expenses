import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { TransactionList } from '../../../components/Helper/TransactionList';
import { Balance } from '../../../components/Helper/Balance';
import { AddTransaction } from '../../../components/Helper/AddTransaction';

import { ChartComp } from '../../../components/Helper/ChartComp';

import '../../../../css/app.css';



class Home extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {},
            userExpenses: {},
            isLoading: false,
            errors: null,
            success: 0
        }
        this.handleUserExpensesChange = this.handleUserExpensesChange.bind(this);
    }

    handleUserExpensesChange(newExpenses) {
        this.setState({ userExpenses: newExpenses })
    }

    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }// 4.1



    componentDidMount() {
        if (this.state.isLoggedIn) {
            this.getTransaction(this.state.user.id, this.state.user.access_token)
        }
    }

    getTransaction(userID, access_token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
        axios.get("/api/auth/userExpenses", { params: { 'user_id': userID } }).then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                let expenses = json.data.expenses;
                this.setState({
                    userExpenses: expenses,
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
        const userExpenses1 = this.state.userExpenses
        const isLoading1 = this.state.isLoading
        const gotData = this.state.success;

        return (
            <React.Fragment>
                <Header userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} />
                <div>
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
                                                                <TransactionList transactions={userExpenses1} handlerChange={this.handleUserExpensesChange} />
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
} export default Home