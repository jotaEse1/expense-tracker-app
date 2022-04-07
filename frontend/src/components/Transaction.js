import React from 'react';
import './Transaction.css'
import {animated} from 'react-spring'

const Transaction = ({transaction, listTransactions}) => {
    const {category, description, price, unix} = transaction

    const dateStr = new Date(unix),
        daysArr = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        monthsArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        year = dateStr.getFullYear(),
        month = monthsArr[dateStr.getMonth()],
        date = dateStr.getDate(),
        day = daysArr[dateStr.getDay()],
        hour = `${dateStr.getHours()}`.length === 1? `0${dateStr.getHours()}` : `${dateStr.getHours()}`,
        minutes = `${dateStr.getMinutes()}`.length === 1? `0${dateStr.getMinutes()}` : `${dateStr.getMinutes()}`;

    return (
        <>
            {listTransactions((style, item) => 
                item &&
                    <animated.div className='transaction' style={style}>
                        <div className='transaction-info'>
                            <p className='transaction-info-title'>{category.toUpperCase()}</p>
                            <p className='transaction-info-date'>{`${day} ${month} ${date} ${year} ${hour}:${minutes}`}</p>
                            <p className='transaction-info-description'>{description}</p>
                        </div>
                        <div className='transaction-price'>
                            <p>$ {price}</p>
                        </div>
                    </animated.div>
            )}
        </>
    );
};

export default Transaction;