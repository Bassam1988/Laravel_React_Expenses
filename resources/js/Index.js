import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Link, Route, Switch} from 'react-router-dom';
import Main from './Router';

class Index extends Component {
  render() {
    return (
      <HashRouter>
        <Route component={Main} />
      </HashRouter>
    );
  }
}
ReactDOM.render(<Index/>, document.getElementById('index'));