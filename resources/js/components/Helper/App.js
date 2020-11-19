
import '../../css/app.css';
import {Header} from './Header';
import {Balance} from './Balance';
import {IncomeExenses} from './IncomeExpenses';
import {TransactionList} from './TransactionList';
import {AddTransaction} from './AddTransaction';
import {ChartComp} from './ChartComp';
import React from 'react';

import {GlobalProvider} from '../context/GlobalState';

function App() {
  return (
    <GlobalProvider >
      <Header/>
      <div id="container1">
        <Balance/>
        <IncomeExenses/>
        <TransactionList/>
        <AddTransaction/>
        <ChartComp/>
      </div>
      
    </GlobalProvider>
  );
}

export default App;
