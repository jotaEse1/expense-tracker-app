import React, {useState} from 'react';
import './Login.css'
import {animated} from 'react-spring'

const Login = ({handleAutentication, setShow, changeOptions, autentication}) => {
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
            item === 'login' &&
                <animated.div className='login-container' style={style}>
                    <h2>Log in</h2>
                    <form onSubmit={(e) => handleSubmit(e, 'Login', form)}>
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
                            onClick={() => setShow('signin')}
                        >You don't have an account?</span>  
                        <button
                            type='submit'
                        >Log in</button>
                    </form>
                </animated.div>
        )}
        </>
    );
};

export default Login;