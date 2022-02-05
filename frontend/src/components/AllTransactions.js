import React from 'react';
import Transaction from './Transaction'
import Modal from './Modal'
import './AllTransactions.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons'
import Pagination from './Pagination';

const AllTransactions = ({modalAppear, setModalVisible, handleSearch, handleCreate, setModalIncomplete, transactions, listTransactions, setListTransHandler, currentPage, setCurrentPage, notFound}) => {
    return (
        <div className='all-transactions'>
            <div className='all-transactions-buttons'>
                <button
                    onClick={() => setModalVisible('create')}
                >
                    <FontAwesomeIcon icon={faPlus} className='icon'/>
                </button>
                <button
                    onClick={() => setModalVisible('search')}
                >
                    <FontAwesomeIcon icon={faSearch} className='icon'/>
                </button>
            </div>
            <Modal
                modalAppear={modalAppear}
                setModalVisible={setModalVisible}
                handleSearch={handleSearch}
                handleCreate={handleCreate}
                setModalIncomplete={setModalIncomplete}
                setListTransHandler={setListTransHandler}
            />
            {transactions.length? (
                <Pagination 
                    transactions={transactions}
                    listTransactions={listTransactions} 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ):(
                <></>
            )}
            {notFound && <p>No transaction was found</p>}
        </div>
    );
};

export default AllTransactions;