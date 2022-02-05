const dataConverterHelper = (chartsData) => {
    const dateConverter = (unix) => {
        const dateStr = new Date(unix),
             year = dateStr.getFullYear(),
             month = `${dateStr.getMonth() + 1}`.length === 1? `0${dateStr.getMonth() + 1}` : `${dateStr.getMonth() + 1}`,
             date = `${dateStr.getDate()}`.length === 1? `0${dateStr.getDate()}` : `${dateStr.getDate()}`,
             fullDate = `${year}-${month}-${date} 00:00:00`
  
        return fullDate 
    }

    let correctData = []

    //to get all dates in the dataset, without duplicates
    let allDatesSet = new Set([])
    chartsData.map((obj) => allDatesSet.add(dateConverter(obj.unix)))
    let allDatesArr = Array.from(allDatesSet)

    //grouping data by dates
    allDatesArr.map((date) => {
        let transactions = []

        //here I group transactions by date with this map
        chartsData.map((obj) => {
            if (dateConverter(obj.unix) === date) return transactions.push(obj.price)
        })

        //to get the total amount spent by date
        let totalSpent = transactions.reduce((acumulator, current) => acumulator + current)

        return correctData.push({unix: new Date(date).getTime(), transactions, totalSpent, date})
    })

    return correctData
}

export {dataConverterHelper}