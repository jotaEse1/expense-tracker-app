import React from 'react';
import NavBar from './NavBar'
import LineChart from './LineChart';
import LatestTrans from './LatestTrans';
import AllTransactions from './AllTransactions';
import ModalIncomplete from './ModalIncomplete'
import ModalSuccessful from './ModalSuccessful';
import ModalError from './ModalError';
import ModalInfo from './ModalInfo';
import {useState, useEffect} from 'react'
import {useTransition, animated, config} from 'react-spring'
import {unixHelper} from '../helpers/unixHelper'
import './Dashboard.css';


const Dashboard = ({idUser, setAutentication, setIdUser, username}) => {
  const [transactions, setTransactions] = useState([]);
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [chartsData, setChartsData] = useState('empty');
  const [timeRange, setTimeRange] = useState('7-Days');
  const [detailedData, setDetailedData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [homeVisible, setHomeVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalIncomplete, setModalIncomplete] = useState(false);
  const [modalSuccessful, setModalSuccessful] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forceRender, setForceRender] = useState(false);
  const [listTransHandler, setListTransHandler] = useState(true);
  const [notFound, setNotFound] = useState(false);

  //fetch data for latest transactions when the component did mount
  useEffect(() => {
    const urlLatest = `https://expense-tracker.joaquinsanchez9.repl.co/api/v1/search?category=empty&price=empty&dateFrom=empty&dateTo=empty&type=latest&id=${idUser}`
 
    fetch(urlLatest)
      .then(res => res.json())
      .then(res => setLatestTransactions(res.data))
      .catch(err => err)
    
  }, [])

  //force the render for update allTransactions, chart and latestTransactions list when creating a new transaction
  useEffect(() => {
    if (!forceRender) return;

    const rangeObj = unixHelper(timeRange),
        urlLatest = `https://expense-tracker.joaquinsanchez9.repl.co/api/v1/search?category=empty&price=empty&dateFrom=empty&dateTo=empty&type=latest&id=${idUser}`,
        urlAll = `https://expense-tracker.joaquinsanchez9.repl.co/api/v1/search?category=${forceRender.category}&price=0&dateFrom=empty&dateTo=empty&id=${idUser}`,
        urlCharts = `https://expense-tracker.joaquinsanchez9.repl.co/api/v1/search?category=empty&price=0&dateFrom=${rangeObj.from}&dateTo=${rangeObj.to}&id=${idUser}`;
    
    Promise.all([
        fetch(urlLatest),
        fetch(urlAll), 
        fetch(urlCharts)
      ]).then(responses => Promise.all(responses.map(res => res.json())))
      .then(([latest, all, charts]) => {
        setLatestTransactions(latest.data)
        setChartsData(charts.data)
        return setTransactions(all.data)
      })
    
  }, [forceRender])

  //when the user choose the time range it´s neccesary to fetch the data in that time range
  useEffect(() => {
    const rangeObj = unixHelper(timeRange),
        urlCharts = `https://expense-tracker.joaquinsanchez9.repl.co/api/v1/search?category=empty&price=0&dateFrom=${rangeObj.from}&dateTo=${rangeObj.to}&id=${idUser}`;

     fetch(urlCharts)
        .then(res => res.json())
        .then(res => setChartsData(res.data))
        .catch(err => err)
      
  }, [timeRange])

  //animations
  const homeAppear = useTransition(homeVisible ,{
    from: {x: -100, y: 0, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    leave: {x: -100, y: 0, opacity: 0},
    exitBeforeEnter: true
  })

  const modalAppear = useTransition(modalVisible ,{
    from: {x: 0, y: -100, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    leave: {x: 0, y: 100, opacity: 0},
    config: config.gentle
  })

  const modalIncomp = useTransition(modalIncomplete , {
    from: {x: 0, y: -100, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    leave: {x: 0, y: -100, opacity: 0},
    config: config.gentle
  })

  const modalSuccess = useTransition(modalSuccessful , {
    from: {x: 0, y: -100, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    leave: {x: 0, y: -100, opacity: 0},
    config: config.gentle
  })

  const modalErr = useTransition(modalError , {
    from: {x: 0, y: -100, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    leave: {x: 0, y: -100, opacity: 0},
    config: config.gentle
  })

  const modalInf = useTransition(modalInfo , {
    from: {x: 0, y: -100, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    leave: {x: 0, y: -100, opacity: 0},
    config: config.gentle
  })

  const listTransactions = useTransition(listTransHandler, {
    from: {x: 0, y: -100, opacity: 0},
    enter: {x: 0, y: 0, opacity: 1},
    leave: {x: 0, y: 100, opacity: 0},
    config: config.gentle
  })

  //this is executed when looking for a transaction
  const handleSearch = (data) => {
    const {category = 'empty', price = 0, dateFrom = 'empty', dateTo = 'empty'} = data
    
    //validate dates 
    if ((!new Date(dateFrom).getTime() && dateFrom !== 'empty' ) 
        || ((!new Date(dateTo).getTime()) && dateTo !== 'empty')){
            setErrorMessage('Invalid date')
            setModalError(true)
            setListTransHandler(true)
            return setTimeout(() => setModalError(false), 2000)
          } 

    const url = `https://expense-tracker.joaquinsanchez9.repl.co/api/v1/search?category=${category}&price=${price}&dateFrom=${dateFrom}&dateTo=${dateTo}&id=${idUser}`

    fetch(url)
      .then(res => res.json())
      .then(res => {
        setCurrentPage(1) //for the pagination component, sets the current page to 1

        if (!res.data.length){
          setNotFound(true) //to show a p element because no transaction was found
          setTransactions([])
          return setListTransHandler(true); //for the animation when the transactions appear
        }else{
          setNotFound(false)
          setTransactions(res.data)
          return setListTransHandler(true); //for the animation when the transactions appear
        }
      })
      .catch(err => err)

  }

  //this is executed when create a transaction
  const handleCreate = (data) => {
    const url = `https://expense-tracker.joaquinsanchez9.repl.co/api/v1/create`
    data.id = idUser;

    const options = {
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
        if (res.success){
          setTimeout(() => setModalSuccessful(true), 1000)
          setTimeout(() => setModalSuccessful(false), 3000)
          return setForceRender(res.data) //to force the render 
        }else{
          setTimeout(() => {
            setModalError(true)
            return setErrorMessage(res.msg)
          }, 1000)
          return setTimeout(() => setModalError(false), 4000)
        }

      })
      .catch(err => err)
  }


  return (
    <>
      <NavBar 
        setHomeVisible={setHomeVisible}
        homeVisible={homeVisible}
        setAutentication={setAutentication}
        setIdUser={setIdUser}
      />
      {homeAppear((style, item) => 
        item? (
          <animated.div className='main' style={style}>
            <div className='charts-container'>
              <LineChart 
                chartsData={chartsData}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                setModalInfo={setModalInfo}
                setDetailedData={setDetailedData}
                username={username}
              />
            </div>
            <LatestTrans 
              latestTransactions={latestTransactions}
              listTransactions={listTransactions}
            />
          </animated.div>
        ):(
          <animated.div style={style}>
            <AllTransactions 
              modalAppear={modalAppear} 
              setModalVisible={setModalVisible}
              handleSearch={handleSearch}
              handleCreate={handleCreate}
              setModalIncomplete={setModalIncomplete}
              transactions={transactions}
              listTransactions={listTransactions}
              setListTransHandler={setListTransHandler}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              notFound={notFound}
            />
          </animated.div>
        )
      )}
      {modalIncomp((style, item) =>
        item &&
          <animated.div>
            <ModalIncomplete 
              style={style}       
            />
          </animated.div>
      )}
      {modalSuccess((style, item) =>
        item &&
          <animated.div>
            <ModalSuccessful 
              style={style}
            />
          </animated.div>
      )}
      {modalErr((style, item) =>
        item && 
          <animated.div>
            <ModalError 
              errorMessage={errorMessage}
              style={style}
            />
          </animated.div>
      )}
      {modalInf((style, item) => 
        item && 
          <animated.div>
            <ModalInfo 
              detailedData={detailedData}
              setModalInfo={setModalInfo}
              timeRange={timeRange}
              style={style}
            />
          </animated.div>
      )}
    </>
  );
};

export default Dashboard;

