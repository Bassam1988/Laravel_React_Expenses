import React, { Component } from 'react';
import LogoutContainer from './LogoutContainer';
import { withRouter } from "react-router-dom";
class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: props.location,
        };
    } render() {
        return (
            <div className="content">
                <LogoutContainer redirect={this.state.redirect} />
            </div>
        )
    }
} export default withRouter(Logout);