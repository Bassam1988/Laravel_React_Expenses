import { param } from 'jquery';
import React, { useContext } from 'react'

//import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({ transaction }) => {

   // const { deleteTransaction } = useContext(GlobalContext);
    const sign = transaction.expenseType > 0 ? '-' : '+';
    return (
        <li className={transaction.expenseType > 0 ? 'minus' : 'plus'}>
            {transaction.categories.name} <span>{datef(transaction.created_at)}</span> <span>{sign}${transaction.amount}</span><button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
        </li>
    )
}

function deleteTransaction(id)
{
    axios.delete(`/api/auth/deleteTransaction/`,{params: {'id': id}})
    .then(res => {
        if(res.data.success)
        {
            alert('you delete the transaction successfully');
        }
     // console.log(res);
      //console.log(res.data);

     // const posts = this.state.posts.filter(item => item.id !== id);
     // this.setState({ posts });
    })

}


function datef(date)
{
    const d= new Date(date)
    return new Intl.DateTimeFormat('en-GB').format(d);
}