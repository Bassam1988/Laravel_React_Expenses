import React, { useState, useEffect } from 'react'

import { DatePickerInput } from 'rc-datepicker';
//import { GlobalContext } from '../../context/GlobalState';

export const EditTransaction = ({ user, handlerChange,showEditTransaction,transaction,close }) => {



  const [categories, setCategories] = useState({});
  const [success, setsuccess] = useState(false);
  const [categories_id, setcat_name] = useState(transaction.categories_id);
  const [amount, setAmount] = useState(transaction.amount);
  const [created_at, setCreated_at] = useState(transaction.created_at);
  const [expenseType, setExpenseType] = useState(transaction.expenseType);
  const [id, setID] = useState(transaction.id);

  //const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      id:id,
      categories_id,
      amount: +amount,
      expenseType,
      user_id: transaction.user_id,
      created_at:created_at,

    }

    editTransaction(newTransaction);
  }


  function editTransaction(newTransaction) {
    console.log(newTransaction)
    axios.put("/api/auth/editTransaction", newTransaction)
      .then(response => {
        return response;
      }).then(json => {
        if (json.data.success) {
          let newExpenses = json.data.expenses;
          handlerChange(newExpenses);
          alert("you edit transaction successfully")
          close()
        } else {
          alert(`Our System Failed To Register Your Account!`);
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
      })
  }

  useEffect(() => {
    axios.get("/api/auth/GetCategories").then(response => {
      return response;
    }).then(json => {
      if (json.data.success) {
        let categoriesVar = json.data.categories;
        setCategories(categoriesVar);
        setsuccess(1);
      }
      else {
        alert(`Our System Failed To Logout from Your Account!`);
      }
    })
  }, [setCategories]);

  return (
    <React.Fragment>
      <h3>Edit transaction</h3>
      <form onSubmit={onSubmit}>
        <div >
          <div className="radio" value={expenseType} onChange={(e) => setExpenseType(e.target.value)}>
            <input type="radio" value="0" name="expType" defaultChecked={!expenseType}/> Income  <br />
            <input type="radio" value="1" name="expType" defaultChecked={expenseType} /> Expense
        </div>
        </div>
        <div >
          <select className="custom-select custom-select-sm" value={transaction.categories.id} onChange={(e) => setcat_name(e.target.value)}>
            {success ? (categories.map(categorie =>
              (
                <option className="dropdown-item" key={categorie.id} value={categorie.id} >{categorie.name}</option>))) : ""}
          </select>
        </div>
        <div >
          <label htmlFor="amount">Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <div >
          <label htmlFor="created_at">Created Date</label>
          <DatePickerInput
            onChange={(jsDate, dateString)=> setCreated_at(dateString)}
            value={created_at}
            className='my-custom-datepicker-component'
          />
        </div>

        <div>
          <button className="btn">Edit transaction</button>
        </div>
      </form>
    </React.Fragment>
  )
}

