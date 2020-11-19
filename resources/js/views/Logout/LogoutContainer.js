import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
class LogoutContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            error: '',
            formSubmitting: false,
            user: {
                email: '',
                password: '',
            },
            redirect: props.redirect,
            message: '',
        };
        this.handleLogout = this.handleLogout.bind(this);

    }

    componentWillMount() {
        let state = localStorage["appState"];

        if (state) {
            let AppState = JSON.parse(state);
            this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user });
        }
    }

    componentDidMount() {
        const { prevLocation } = this.state.redirect.state || { prevLocation: { pathname: '/logout' } };
        if (prevLocation && this.state.isLoggedIn) {
            return this.props.history.push(prevLocation);
        }
    }

    handleLogout(e) {
        console.log("start");
        e.preventDefault();
        this.setState({ formSubmitting: true });
        let userId = this.state.user.id;
   
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.user.access_token
        axios.get("/api/auth/logout", {params: {'user_id': userId}}).then(response => {
            return response;
        }).then(json => {
            if (json.data.success) {
                let APImessage = json.data.message;
                let appState = {
                    isLoggedIn: false,
                    user: {}
                };
                localStorage["appState"] = JSON.stringify(appState);
                this.setState({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user,
                    error: '',
                    message: APImessage
                });
                location.reload()
            } else {
                alert(`Our System Failed To Logout from Your Account!`);
            }
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                let err = error.response.data;
                this.setState({
                    error: err.message,
                    errorMessage: err.errors,
                    formSubmitting: false
                })
            }
            else if (error.request) {
                // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                let err = error.request;
                this.setState({
                    error: err,
                    formSubmitting: false
                })
            } else {
                // Something happened in setting up the request that triggered an Error
                let err = error.message;
                this.setState({
                    error: err,
                    formSubmitting: false
                })
            }
        }).finally(this.setState({ error: '' }));
    }
    render() {
        const { state = {} } = this.state.redirect;
        const { error } = state; return (
            <div className="container">
                <div className="row">
                    <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
                        <h2 className="text-center mb30">Log out from Your Account</h2>
                        {this.state.isLoggedIn ? <FlashMessage duration={60000} persistOnHover={true}>
                            <h5 className={"alert alert-success"}>Logout successful, redirecting...</h5></FlashMessage> : ''}
                        {this.state.error ? <FlashMessage duration={100000} persistOnHover={true}>
                            <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5></FlashMessage> : ''}
                        {error && !this.state.isLoggedIn ? <FlashMessage duration={100000} persistOnHover={true}>
                            <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}


                        <button type="button" name="singlebutton" onClick={this.handleLogout}
                            className="btn btn-default btn-lg  btn-block mb10">
                            {this.state.formSubmitting ? "Logging You out..." : "Log out"}
                        </button>

                    </div>        <p className="text-white">Don't have an account? <Link to="/register" className="text-yellow"> Register</Link>
                        <span className="pull-right">
                            <Link to="/" className="text-white">Back to Index</Link>
                        </span>
                    </p>
                </div>
            </div>
        )
    }
} export default withRouter(LogoutContainer);