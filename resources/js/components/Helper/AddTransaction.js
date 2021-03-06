import React, { useState, useEffect } from 'react'

import { DatePickerInput } from 'rc-datepicker';
//import { GlobalContext } from '../../context/GlobalState';

export const AddTransaction = ({ user, handlerChange,showAddTransaction }) => {



  const [categories, setCategories] = useState({});
  const [success, setsuccess] = useState(false);
  const [categories_id, setcat_name] = useState('');
  const [amount, setAmount] = useState(0);
  const [created_at, setCreated_at] = useState(new Date());
  const [expenseType, setExpenseType] = useState(0);

  //const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {

      categories_id,
      amount: +amount,
      expenseType,
      user_id: user.id,
      created_at:created_at,

    }

    addTransaction(newTransaction);
  }


  function addTransaction(newTransaction) {
    console.log(newTransaction)
    axios.post("/api/auth/addTransaction", newTransaction)
      .then(response => {
        return response;
      }).then(json => {
        if (json.data.success) {
          let newExpenses = json.data.expenses;
          handlerChange(newExpenses);
          alert("you add new transaction successfully")
          showAddTransaction()
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
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div >
          <div className="radio" onChange={(e) => setExpenseType(e.target.value)}>
            <input type="radio" value="0" name="expType" /> Income  <br />
            <input type="radio" value="1" name="expType" /> Expense
        </div>
        </div>
        <div >
          <select className="custom-select custom-select-sm" onChange={(e) => setcat_name(e.target.value)}>
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
          <button className="btn">Add transaction</button>
        </div>
      </form>
    </React.Fragment>
  )
}

