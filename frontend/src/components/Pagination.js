import React from 'react';
import Transaction from './Transaction';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Pagination.css'

const Pagination = ({transactions, listTransactions, currentPage, setCurrentPage}) => {
    const transXPage = 20
    const totalTrans = transactions.length
    const repeat = Math.ceil(totalTrans/transXPage)
    let minLong = 0
    let maxLong = transXPage
    const dividedTrans = []

    for (let index = 0; index < repeat; index++) {
        dividedTrans.push(transactions.slice(minLong, maxLong))

        minLong += transXPage
        maxLong += transXPage
    }


    return (
        <div className='pagination'>
            {dividedTrans.length? (
                dividedTrans[currentPage - 1].map(transaction => 
                    <Transaction 
                        key={transaction['_id']} 
                        transaction={transaction} 
                        listTransactions={listTransactions} 
                    />
                )
                
            ):(
                <p>Transactions not found</p>
            )}
            {transactions.length && 
                <div className='pagination-control'>
                    <button
                        type='button'
                        onClick={currentPage === 1? null : () => setCurrentPage(prev => prev - 1)}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <p>
                        {currentPage === 1
                            ? 1 
                            : (currentPage - 1) * transXPage
                        }
                        -
                        {currentPage === 1
                            ? dividedTrans[0].length
                            : currentPage === repeat
                            ? totalTrans 
                            : currentPage * transXPage
                        } of {totalTrans} transactions
                    </p>
                    <button
                        type='button'
                        onClick={currentPage === repeat? null : () => setCurrentPage(prev => prev + 1)}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            }
        </div>
    );
};

export default Pagination;