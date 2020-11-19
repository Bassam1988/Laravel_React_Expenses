import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';



class Home extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: {},
            userExpenses: {},
            isLoading: false,
            errors: null
        }
        // this.getTransaction=this.getTransaction.bind(this)
    }// check if user is authenticated and storing authentication data as states if true
    componentWillMount() {
        let state = localStorage["appState"];
        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });

            //this.getTransaction(AppState.user.id, AppState.user.access_token)
        }
    }// 4.1



    componentDidMount() {
        console.log('didmount' + this.state.isLoggedIn);
        if (this.state.isLoggedIn) {
            console.log('fuck you')
            this.getTransaction(this.state.user.id, this.state.user.access_token)
        }

        // console.log(this.state.userExpenses)
    }

    async getTransaction(userID, access_token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
        const res = await axios.get("/api/auth/userExpenses", { params: { 'user_id': userID } });


        try {

            this.setState({
                userExpenses: res.data.expenses,
                isLoading: false
            });
        } catch (error) {
            this.setState({ error, isLoading: false });


        }
    }

    render() {
        // const { isLoading, userExpenses1 } = this.state;
        const userExpenses1 = this.state.userExpenses

        const isLoading1 = this.state.isLoading
        if (userExpenses1[0]) {
            console.log(userExpenses1)
        }
        return (
            <React.Fragment>
                <h2>Random Post</h2>
                <div>
                    {!isLoading1? (
                        userExpenses1[0]?
                       ( userExpenses1.map(expense => {
                            const { _id, amount, user_id } = expense;
                            return (
                                <div key={_id}>
                                    <h2>{amount}</h2>
                                    <p>{user_id}</p>
                                    <hr />
                                </div>
                            );
                        })) :('')
                    ) : (
                            <p>Loading...</p>
                        )}
                </div>
            </React.Fragment>
        );
    }
} export default Home