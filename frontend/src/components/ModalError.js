import React from 'react';
import './ModalError.css'
import {animated} from 'react-spring'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'

const ModalError = ({errorMessage, style}) => {
    return (
        <> 
            <animated.div className='modal-error-container' style={style}>
                <p>
                    <FontAwesomeIcon icon={faTimes} /> Error. {errorMessage}
                </p>
            </animated.div>    
        </>
    );
};

export default ModalError;