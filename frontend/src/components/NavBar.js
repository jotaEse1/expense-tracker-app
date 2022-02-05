import React from 'react';

const NavBar = ({setHomeVisible, homeVisible, setIdUser, setAutentication}) => {
    return (
        <header className='header'>
            <h2>Expense Tracker</h2>
            <nav className='navbar'>
                <div>
                    <button
                        onClick={() => setHomeVisible(true)}
                        className={homeVisible? 'current-page' : null}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => setHomeVisible(false)}
                        className={!homeVisible? 'current-page' : null}
                    >
                        Transactions
                    </button>
                    <button
                        onClick={() => {
                            setAutentication(false); 
                            setIdUser('')
                            localStorage.removeItem('user')
                            localStorage.removeItem('autentication')
                        }}
                    >
                        Log out
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;