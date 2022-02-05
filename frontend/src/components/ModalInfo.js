import React, {useState} from 'react';
import Row from './Row'
import {animated} from 'react-spring'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import './ModalInfo.css'

const ModalInfo = ({detailedData, setModalInfo, timeRange, style}) => {
    let details;
    let time;
    const allTrans = [],
        allSpent = []

    if (timeRange === '7-Days') time = 7
    if (timeRange === '1-Month') time = 30
    if (timeRange === '3-Months') time = 90
    if (timeRange === '6-Months') time = 180
    if (detailedData.length){
        detailedData.map((obj) => {
            allTrans.push(obj.transactions.length)
            allSpent.push(obj.totalSpent )
        })
    
        const totalTrans = allTrans.reduce((acumulator, current) => acumulator + current),
            totalSpent = allSpent.reduce((acumulator, current) => acumulator + current),
            avgTrans = (totalTrans/time).toFixed(1),
            avgSpent = (totalSpent/time).toFixed(2)
    
        details = {totalTrans, totalSpent, avgTrans, avgSpent}
    }
    if (!detailedData.length) details = {totalTrans: 0, totalSpent: 0, avgTrans: 0, avgSpent: 0}


    return (
        <div className='modalInfo'>
            <animated.div className='modalInfo-container' style={style}>
                <h4>Latest {timeRange} transactions details</h4>
                <Row title={'Total Spent'} information={`$${details.totalSpent}`} />
                <Row title={'Total Transactions'} information={details.totalTrans} />
                <Row title={'Avg spent p/day'} information={`$${details.avgSpent}`} />
                <Row title={'Avg transactions p/day'} information={details.avgTrans} />
                <button onClick={() => setModalInfo(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </animated.div>
        </div>
    );
};

export default ModalInfo;