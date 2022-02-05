import React from 'react';
import './ModalAut.css'
import {animated} from 'react-spring'


const ModalAut = ({msg, style}) => {
    return (
        <> 
            <animated.div className='modal-error-container' style={style}>
                <p>{msg}</p>
            </animated.div>    
        </>
    );
};

export default ModalAut;