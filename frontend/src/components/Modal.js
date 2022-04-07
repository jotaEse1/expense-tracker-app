import React, {useState} from 'react';
import {animated} from 'react-spring'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes, faSearch, faPlus} from '@fortawesome/free-solid-svg-icons'
import './Modal.css'

const Modal = ({modalAppear, setModalVisible, handleSearch, handleCreate, setModalIncomplete, setListTransHandler}) => {
    const [form, setForm] = useState('');
    const [selected, setSelected] = useState('Category');

    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        if(e.target.name === 'category') setSelected(e.target.value)
    }

    const handleSubmit = (e, type) => {
        e.preventDefault()

        if (type === 'create'){
            const allKeys = Object.keys(form)
            let finalObj = {}
            
            allKeys.includes('category') ? finalObj.category = form.category : setModalIncomplete(true)
            allKeys.includes('price') ? finalObj.price = form.price : setModalIncomplete(true)
            allKeys.includes('description') ? finalObj.description = form.description : setModalIncomplete(true)

            const category = Object.keys(finalObj).includes('category'),
                price = Object.keys(finalObj).includes('price'),
                description = Object.keys(finalObj).includes('description')

            if (!category || !price || !description){
                return setTimeout(() => setModalIncomplete(false), 2500)
            }
            
            handleCreate(form)
            setModalVisible(false)
            setSelected('Category')
            return setForm('')
        } 
        if (type === 'search'){
            setListTransHandler(false)
            setModalVisible(false)
            setSelected('Category')
            handleSearch(form)
            return setForm('')
        } 
    }

    return (
        <>
            {modalAppear((style, item) => 
                item === 'create' && 
                    <div className='modal-div'>
                        <animated.div className='modal-div-container' style={style}>
                                <button
                                    type='button'
                                    name='close'
                                    onClick={() => {setModalVisible(false); setForm('')}}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            <animated.form onSubmit={e => handleSubmit(e, 'create')} className='modal-form'>
                                <h3>Add a Transaction</h3>
                                <select name="category" value={selected} onChange={handleForm}>
                                    <option disabled value='Category'>Category</option>
                                    <option value="food">Food</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="utilities">Utilities</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="housing">Housing</option>
                                    <option value="debt">Debt</option>
                                    <option value="entertainment">Entertainment</option>
                                </select>
                                <input 
                                    type='text'
                                    name='description'
                                    placeholder='Description*'
                                    // required
                                    onChange={handleForm}
                                />
                                <input 
                                    type='text'
                                    name='price'
                                    placeholder='Price $*'
                                    // required
                                    onChange={handleForm}
                                />
                                <button
                                    type='submit'
                                    name='submit'
                                >
                                    <FontAwesomeIcon icon={faPlus} className='icon'/>
                                </button>
                            </animated.form>
                        </animated.div>
                    </div>
            )}
            {modalAppear((style, item) => 
                item === 'search' && 
                    <div className='modal-div'>
                        <animated.div className='modal-div-container' style={style}>
                                <button
                                    type='button'
                                    name='close'
                                    onClick={() => {setModalVisible(false); setForm('')}}
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            <animated.form onSubmit={e => handleSubmit(e, 'search')} className='modal-form' >
                                <h3>Search Transactions</h3>
                                <select name="category" value={selected} onChange={handleForm}>
                                    <option disabled value='Category'>Category</option>
                                    <option value="food">Food</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="utilities">Utilities</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="housing">Housing</option>
                                    <option value="debt">Debt</option>
                                    <option value="entertainment">Entertainment</option>
                                </select>
                                <input 
                                    type='text'
                                    name='price'
                                    placeholder='Price $'
                                    onChange={handleForm}
                                />
                                <input 
                                    type='text'
                                    name='dateFrom'
                                    placeholder='from (YYYY-MM-DD)'
                                    onChange={handleForm}
                                />
                                <input 
                                    type='text'
                                    name='dateTo'
                                    placeholder='to (YYYY-MM-DD)'
                                    onChange={handleForm}
                                />
                                <button
                                    type='submit'
                                    name='submit'
                                >
                                    <FontAwesomeIcon icon={faSearch} className='icon'/>
                                </button>
                            </animated.form>
                        </animated.div>
                    </div>
            )}
        
        </>
    );
};

export default Modal;