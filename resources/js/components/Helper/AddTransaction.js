import React, {useState, useContext} from 'react'

import { GlobalContext } from '../../context/GlobalState';

export const AddTransaction = () => {

 

    const [cat_name, setcat_name] = useState('');
    const [amount, setAmount] = useState(0);

    const { addTransaction } = useContext(GlobalContext);

    const onSubmit=e=>{
      e.preventDefault();

      const newTransaction={
        id: Math.floor(Math.random() * 100000000),
        cat_name,
        amount: +amount,
        backgroundColor:'rgba(255, 130, 132, 0.2)',
        borderColor:'rgba(255, 130, 132, 1)'
      }

      addTransaction(newTransaction);
    }

    return (
    <>
    <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="cat_name">Text</label>
          <input type="text" value={cat_name} onChange={(e) => setcat_name(e.target.value)}  placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
      </>
    )
}