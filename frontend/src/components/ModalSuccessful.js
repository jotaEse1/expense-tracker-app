import React from 'react';
import './ModalSuccessful.css'
import {animated} from 'react-spring'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck} from '@fortawesome/free-solid-svg-icons'

const ModalSuccessful = ({style}) => {
    return (
        <> 
            <animated.div className='modal-successful-container' style={style}>
                <p>
                    <FontAwesomeIcon icon={faCheck} /> Transaction created 
                </p>
            </animated.div>    
        </>  
    );
};

export default ModalSuccessful;

