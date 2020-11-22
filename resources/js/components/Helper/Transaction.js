import { param } from 'jquery';
import React, { useContext } from 'react'

//import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({ transaction, handlerChange }) => {

    function deleteTransaction(id) {
        axios.delete(`/api/auth/deleteTransaction/`, { params: { 'id': id } })
            .then(res => {
                if (res.data.success) {
                    let newExpenses = res.data.expenses;
                    handlerChange(newExpenses);
                    alert('you delete the transaction successfully');
                }
                // console.log(res);
                //console.log(res.data);

                // const posts = this.state.posts.filter(item => item.id !== id);
                // this.setState({ posts });
            })

    }

    // const { deleteTransaction } = useContext(GlobalContext);
    const sign = transaction.expenseType > 0 ? '-' : '+';
    return (
        < tr className={transaction.expenseType > 0 ? 'minus' : 'plus'}>
            <td>
                <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
            </td>
            <th scope="row">{transaction.categories.name}</th>
            <td>{datef(transaction.created_at)}</td>
            <td>{sign}${transaction.amount}</td>

        </tr>
    )
}




function datef(date) {
    const d = new Date(date)
    return new Intl.DateTimeFormat('en-GB').format(d);
}