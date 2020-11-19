export default (state, action) => {
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }

        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        case 'GET_TRANSACTION':
            {
                let state = localStorage["appState"];
                if (state) {
                    let AppState = JSON.parse(state);
                    getTransaction(AppState.user.id, AppState.user.access_token);
                }
              
            }
        default:
            return state;
    }
}


function getTransaction(userID, access_token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
    axios.get("/api/auth/userExpenses", { params: { 'user_id': userID } }).then(response => {
        return response;
    }).then(json => {
        if (json.data.success) {
            let expenses = json.data.expenses;
            return {
                ...state,
                transactions: getTransaction(action.payload)

            }

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

