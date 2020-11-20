import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


class Header extends Component {
  // 1.1
  constructor(props) {
    super(props);
    this.state = {
      userData: props.userData,
      userIsLoggedIn: props.userIsLoggedIn,

    };
   // this.logOut = this.logOut.bind(this);
  } 
  
  // 1.2
  /*logOut() {
    let appState = {
      userIsLoggedIn: false,
      user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
    //setCookie("appState", JSON.stringify(appState) );
    this.setState(appState);
    this.props.history.push('/login');
  }  */
  
  // 1.3
  render() {
    const aStyle = {
      cursor: 'pointer'
    };   
    return (

      <nav className="navbar navbar-dark bg-primary" >
        <a className="navbar-brand" href="#">Hello {this.state.userIsLoggedIn ? this.state.userData.name : ''}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link to="/">Index</Link></li>
            {this.state.userIsLoggedIn ?
              <li className="nav-item active"><Link to="/dashboard">Dashboard</Link></li>
              : ""}
               {this.state.userIsLoggedIn ?
              <li className="nav-item active"><Link to="/search">Search</Link></li>
              : ""}
            {this.state.userIsLoggedIn ?
              <li className="nav-item"><Link to="/logout">Logout</Link></li>
              : ""}
            {!this.state.userIsLoggedIn ?
              <li className="nav-item"><Link to="/login">Login</Link> | <Link to="/register">Register</Link></li> : ""}

          </ul>
        </div>
      </nav>

    )
  }
}
export default withRouter(Header)