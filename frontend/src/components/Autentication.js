import React, {useState} from 'react';
import './Autentication.css'
import SignIn from './SignIn';
import Login from './Login'
import {useTransition, animated, config} from 'react-spring'


const Autentication = ({handleAutentication, autentication}) => {
    const [show, setShow] = useState(false);
    const [options, setOptions] = useState(false);

    const hideOptions = useTransition(options, {
        from: {y: -50, opacity: 0},
        enter: {y: 0, opacity: 1},
        leave: {y: -50, opacity: 0},
        config: config.gentle,
        exitBeforeEnter: true
    })

    const changeOptions = useTransition(show, {
        from: {y: -50, opacity: 0},
        enter: {y: 0, opacity: 1},
        leave: {y: 50, opacity: 0},
        config: config.gentle,
        exitBeforeEnter: true

    })


    return (
        <div className='autentication-container'>
            <div className='autentication-options-container'>
                {hideOptions((style, item) => 
                    !item &&
                        <animated.div className='autentication-options' style={style}>
                            <h2>Join Expense tracker app today!</h2>
                            <div className='options'>
                                <button onClick={() => {setOptions(true); setShow('signin')}}>Sign up</button>
                                <button onClick={() => {setOptions(true); setShow('login')}}>Log in</button>
                            </div>
                        </animated.div>
                )}
                {changeOptions((style, item) => 
                    item === 'signin' && options ? (
                        <animated.div style={style}>
                            <SignIn 
                                setShow={setShow}
                                changeOptions={changeOptions}
                                handleAutentication={handleAutentication}
                                autentication={autentication}
                            />
                        </animated.div>

                    ):(
                        <animated.div style={style}>
                            <Login 
                                setShow={setShow}
                                changeOptions={changeOptions}
                                handleAutentication={handleAutentication}
                                autentication={autentication}
                            />
                        </animated.div>
                    )
                )}
            </div>
        </div>
    );
};

export default Autentication;