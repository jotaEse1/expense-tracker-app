import React, {useState} from 'react';
import './SignIn.css'
import {useTransition, useSpring, animated, config} from 'react-spring'


const SignIn = ({handleAutentication, setShow, changeOptions, autentication}) => {
    const [form, setForm] = useState('');


    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e, type, form) => {
        e.preventDefault()
        handleAutentication({e, type, form})

        if(autentication) return setForm('')
    }

    return (
        <>
        {changeOptions((style, item) =>
            item === 'signin' &&
                <animated.div className='signin-container' style={style}>
                    <h2>Sign in</h2>
                    <form onSubmit={(e) => handleSubmit(e, 'Signin', form)}>
                        <label htmlFor='username'>Username</label>
                        <input 
                            type='text'
                            placeholder='ElonDoge'
                            name='username'
                            id='username'
                            onChange={handleForm}
                        />
                        <label htmlFor='email'>Email address</label>
                        <input 
                            type='text'
                            placeholder='elonLovesDoge@gmail.com'
                            name='email'
                            id='email'
                            onChange={handleForm}
                        /> 
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleForm}
                        />
                        <span
                            onClick={() => setShow('login')}
                        >Already a user?</span>  
                        <button
                            type='submit'
                        >Register</button>
                    </form>
                </animated.div>
        )}
        </>
    );
};


export default SignIn;