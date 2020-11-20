import React, { Component } from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { TransactionList } from '../../components/Helper/TransactionList';
import { Balance } from '../../components/Helper/Balance';
import { AddTransaction } from '../../components/Helper/AddTransaction';

import { ChartComp } from '../../components/Helper/ChartComp';
import RangeSlider from '../../components/Helper/RangeSlider';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

import '../../../css/app.css';



class Search extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {},
            userExpenses: {},
            isLoading: false,
            errors: null,
            success: 0,
            categories: {},
            startDate: new Date(),
            endDate: new Date(),
        }
        this.onChangeStartDate=this.onChangeStartDate.bind(this);
        this.onChangeEndDate=this.onChangeEndDate.bind(this)
    }


    onChangeStartDate(newDate) {
        this.setState({ startDate: newDate });
    }

    onChangeEndDate(newDate) {
        this.setState({ EndDate: newDate });
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

                    success: 1
                });
            }
            else {
                alert(`Our System Failed To Logout from Your Account!`);
            }
        })
    }



    render() {
        const categories1 = this.state.categories
        //const success = this.state.success;
        const gotData = this.state.success;
        console.log('hi')
        console.log(categories1)

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
                                    <RangeSlider />
                                </td>
                                <td rowSpan="5">
                                    <div className="radio" onChange={(e) => setExpenseType(e.target.value)}>
                                        <input type="radio" value="0" name="expType" /> Income  <br />
                                        <input type="radio" value="1" name="expType" /> Expense
                                    </div>
                                </td>
                                <td rowSpan="5">
                                    <div >
                                        <select className="custom-select custom-select-sm" onChange={(e) => setcat_name(e.target.value)}>
                                            {gotData ? (categories1.map(categorie =>
                                                (
                                                    <option className="dropdown-item" key={categorie.id} value={categorie.id} >{categorie.name}</option>))) : ""}
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <Calendar onChange={this.onChangeStartDate} />
                                </td>
                                <td>
                                    <Calendar onChange={this.onChangeEndDate} />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </React.Fragment >
        );
    }
} export default Search


/*
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
                                            <TransactionList transactions={userExpenses1} />
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <ChartComp transactions={userExpenses1} />
                        </td>
                        <td>
                            <AddTransaction transactions={userExpenses1} />
                        </td>
                    </tr>
                </tbody>
            </table>




        ) : ('')
) : (
        <p>Loading...</p>
    )}*/