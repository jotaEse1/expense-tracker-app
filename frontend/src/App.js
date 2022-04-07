import React, {useState, useEffect} from 'react';
import './App.css'
import Autentication from './components/Autentication';
import ModalAut from './components/ModalAut'
import Dashboard from './components/Dashboard';
import {useTransition, animated, config} from 'react-spring'
import {URLS} from './constants/constants'

const App = () => {
    const [autentication, setAutentication] = useState(false);
    const [username, setUsername] = useState('');
    const [idUser, setIdUser] = useState('');
    const [msg, setMsg] = useState('');
    const [modal, setModal] = useState(false);

    //to maintain user session 
    useEffect(() => {
        const user = localStorage.getItem('user'),
            autentication = localStorage.getItem('autentication'),
            username = localStorage.getItem('username')

        autentication? setAutentication(true) : setAutentication(false);
        user? setIdUser(user) : setIdUser('');
        username? setUsername(username) : setUsername('')
    }, [])

    //animations
    const modalAnim = useTransition(modal , {
        from: {x: 0, y: -100, opacity: 0},
        enter: {x: 0, y: 0, opacity: 1},
        leave: {x: 0, y: -100, opacity: 0},
        config: config.gentle
    })

    const dashBoardAppear = useTransition(autentication, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0},
        exitBeforeEnter: true
    })

    //autentication
    const handleAutentication = ({type, form}) => {
        const {email = '', password = '', username = ''} = form

        if (!email.length || !password.length){
            setModal(true)
            setMsg('Complete all fields!')
            return setTimeout(() => setModal(false), 3000)
        }
        if (!email.includes('@') /*|| !email.includes('.')*/ ){
            setModal(true)
            setMsg('Invalid email')
            return setTimeout(() => setModal(false), 3000)
        }
        if (password.length < 8){
            setModal(true)
            setMsg('Password must be at least 8 characters')
            return setTimeout(() => setModal(false), 3000)
        }
        if (type === 'Login' && form) return login(form)
        if (type === 'Signin' && form) return signin(form)
        
        function login(data){
            const url = URLS.LOGIN,
                options = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
                
            fetch(url, options)
                .then(res => res.json())
                .then(res => {
                    const {situation, username, id} = res

                    if (situation === 'not verified'){
                        setModal(true)
                        setMsg('Incorrect email or password')
                        return setTimeout(() => setModal(false), 3000)
                    }

                    setModal(true)//to make the modal appear
                    setMsg(`Welcome, ${username}!`)
                    setTimeout(() => setModal(false), 2000)//to make the modal dissapear
                    setUsername(username)
                    setIdUser(id)//important when fetching data in the dashboard component
                    localStorage.setItem('user',`${id}`)
                    localStorage.setItem('username',`${username}`)
                    localStorage.setItem('autentication', true)
                    setTimeout(() => setAutentication(true), 2000)//to change from Autentication to Dashboard comp
                })
                .catch(err => console.log(err))
        
        }

        function signin(data){
            if (username.length > 20){
                setModal(true)
                setMsg(`Username must be less than 20 characters`)
                return setTimeout(() => setModal(false), 3000)
            }
            const url = URLS.REGISTER,
                options = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
            
            fetch(url, options)
                .then(res => res.json())
                .then(res => {
                    const {msg, username, id} = res

                    if (msg === 'user exists'){
                        setModal(true)
                        setMsg('User already exists')
                        return setTimeout(() => setModal(false), 3000)
                    }

                    setModal(true) //to make the modal appear
                    setMsg(`Welcome, ${username}!`)
                    setTimeout(() => setModal(false), 2000)//to make the modal dissapear
                    setUsername(username)
                    setIdUser(id)//important when fetching data in the dashboard component
                    localStorage.setItem('user',`${id}`)
                    localStorage.setItem('username',`${username}`)
                    localStorage.setItem('autentication', true)
                    setTimeout(() => setAutentication(true), 2000)//to change from Autentication to Dashboard comp
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            {dashBoardAppear((style, item) => 
                !item? (
                    <animated.div style={style}>
                        <Autentication 
                            handleAutentication={handleAutentication}
                            autentication={autentication}/>
                    </animated.div>
                ):(
                    <animated.div style={style}>
                        <Dashboard 
                            username={username}
                            idUser={idUser}
                            setIdUser={setIdUser}
                            setAutentication={setAutentication}/>
                    </animated.div>
                ))}
            {modalAnim((style, item) => 
                item &&
                    <animated.div>
                        <ModalAut 
                            msg={msg} 
                            modalAnim={modalAnim}
                            style={style}
                        />
                    </animated.div>
            )}
        </>
    );
};

export default App;