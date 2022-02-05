import React from 'react';
import Transaction from './Transaction';

const LatestTrans = ({latestTransactions, listTransactions}) => {
    return (
        <div className='latestTrans'>
            <h1>Latest Transactions</h1>
            <div className='list-trans'>
                {latestTransactions.map(transaction => 
                    <Transaction 
                        key={transaction['_id']} 
                        transaction={transaction} 
                        listTransactions={listTransactions} 
                    />
                )}      
            </div>
        </div>
    );
};

export default LatestTrans;