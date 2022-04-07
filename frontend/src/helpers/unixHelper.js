const unixHelper = (timeRange) => {
    //1 day unix
    const a1D = new Date('2000-01-10'),
    b1D = new Date('2000-01-09'),
    unix1D = a1D - b1D

    //7 days unix
    const a7D = new Date('2000-01-12'),
        b7D = new Date('2000-01-02'),
        unix7D = a7D - b7D
    
    //1 month unix
    const a1M = new Date('2000-02-10'),
        b1M = new Date('2000-01-10'),
        unix1M = a1M - b1M

    //3 months unix
    const a3M = new Date('2000-04-10'),
        b3M = new Date('2000-01-10'),
        unix3M = a3M - b3M
    
    //6 months unix
    const a6M = new Date('2000-07-10'),
        b6M = new Date('2000-01-10'),
        unix6M = a6M - b6M
  

  const rangeObj = {}

  const unixRange = (unix) => {
    const unixToday = new Date().getTime() + unix1D + unix1D,
         diff = new Date(unixToday - unix),
         year = diff.getFullYear(),
         month = `${diff.getMonth() + 1}`.length === 1? `0${diff.getMonth() + 1}` : `${diff.getMonth() + 1}`,
         date = `${diff.getDate()}`.length === 1? `0${diff.getDate()}` : `${diff.getDate()}`,
         dateFrom = `${year}-${month}-${date}`
       
    const today = new Date(unixToday),
         yearT = today.getFullYear(),
         monthT = `${today.getMonth() + 1}`.length === 1? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`,
         dateT = `${today.getDate()}`.length === 1? `0${today.getDate()}` : `${today.getDate()}`,
         dateTo = `${yearT}-${monthT}-${dateT}`

    rangeObj.to = dateTo; 
    rangeObj.from = dateFrom; 
  }

  if (timeRange === '7-Days') unixRange(unix7D)
  if (timeRange === '1-Month') unixRange(unix1M)
  if (timeRange === '3-Months') unixRange(unix3M)
  if (timeRange === '6-Months') unixRange(unix6M)

  return rangeObj

}

export {unixHelper}