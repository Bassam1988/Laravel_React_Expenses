import React, { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../../../context/GlobalState';
import { GlobalProvider } from '../../../context/GlobalState';
import { ChartComp } from '../../../components/Helper/ChartComp';



export const  Dashboard2 = () => {

    const { incomeTransactionsChart } = useContext(GlobalContext);
    const { transactions } = useContext(GlobalContext);

    const { expenseTransactionsChart } = useContext(GlobalContext);
    //const amounts = transactions.map(transaction => transaction.amount);

    //console.log(amounts);

    const [appState, setAppState] = useState({
        loading: false,
        repos: {id:1},
    });

    useEffect(() => {
        console.log('use effect')
        setAppState({ loading: true });
        let user_id=0;
        let access_token=''
        let state = localStorage["appState"];
        if (state) {
            let AppState1 = JSON.parse(state);
            access_token=AppState1.user.access_token;
            user_id=AppState1.user.id

            //this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }

        axios.defaults.headers.common['Authorization'] = 'Bearer ' +  access_token
        axios.get("/api/auth/userExpenses", { params: { 'user_id': user_id } }).then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                let expenses = json.data.expenses;
                 setAppState({ loading: false, repos: expenses });
                } else {
                alert(`Our System Failed To Logout from Your Account!`);
            }
        })
    }, [setAppState]);


    return (
        
        <div>
         

                <div id="container1">

                    <ChartComp />
                </div>

        </div>
    )
}

