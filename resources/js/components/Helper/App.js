
import '../../../css/app.css';
import {Header} from './Header';
import {Balance} from './Balance';
import {IncomeExenses} from './IncomeExpenses';
import {TransactionList} from './TransactionList';
import {AddTransaction} from './AddTransaction';
import {ChartComp} from './ChartComp';
import React ,{useContext, useEffect} from 'react';

import {GlobalProvider} from '../../context/GlobalState';
import {GlobalContext} from '../../context/GlobalState';


function App({Expenses}) {

  const { getTransaction } = useContext(GlobalContext);
  

  useEffect(() => {

    getTransaction(Expenses);
}, []);
  return (
    <GlobalProvider >
     
     <TransactionList/>
    </GlobalProvider>
  );
}

export default App;
