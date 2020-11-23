import Popup from 'reactjs-popup';
import React, { useContext } from 'react'
import { EditTransaction } from './EditTransaction'

export const PopupExample = ({ trigger1, transaction, handlerChange }) => (
    <Popup trigger={trigger1} position="top left">
        {close => (
            <div>
                Content here
                <a className="close" onClick={close}>
                    &times;
          </a>
                <div className='popup'>
                    <div className='popup\_inner'> <EditTransaction handlerChange={handlerChange} transaction={transaction} close={close} />
                    </div>
                </div>
            </div>
        )}
    </Popup>
);