import { param } from 'jquery';
import React, { useContext } from 'react';
import Popup from 'reactjs-popup';
import { PopupExample} from './Popup'
import {EditTransaction} from './EditTransaction';

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

    function togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup,
        });
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
            <td>
                
                <PopupExample trigger1={<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-fill edit-btn" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>} position="right center" transaction={transaction} handlerChange={handlerChange}>
                    
                </PopupExample>
            </td>

        </tr>
    )
}




function datef(date) {
    const d = new Date(date)
    return new Intl.DateTimeFormat('en-GB').format(d);
}