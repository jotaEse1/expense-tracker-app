import React from 'react';
import './ModalIncomplete.css'
import {animated} from 'react-spring'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExclamation} from '@fortawesome/free-solid-svg-icons'

const ModalIncomplete = ({style}) => {
    return (
        <> 
            <animated.div className='modal-incomplete-container' style={style}>
                <p>
                    <FontAwesomeIcon icon={faExclamation} /> Complete all fields
                </p>
            </animated.div>    
        </>
        
    );
};

export default ModalIncomplete;