import React from 'react';
import './Row.css'

const Row = ({title, information}) => {
    return (
        <div className='row'>
            <p>{title}</p>
            <p>{information}</p>
        </div>
    );
};

export default Row;