import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import { dataConverterHelper } from '../helpers/dataConverterHelper';
import './LineChart.css'


const LineChart = ({chartsData, timeRange, setTimeRange, setModalInfo, setDetailedData, username}) => {
    const svgRef = useRef(),
        width = window.screen.width;
    
    //when the data or the screen of the client changes, the chart is drawn
    useEffect(() => {
        if (chartsData === 'empty') return;
        const correctData = dataConverterHelper(chartsData)
        
        d3LineChart(correctData)
        setDetailedData(correctData)
    }, [chartsData, width])

    const d3LineChart = (data) => {
        const svg = d3.select(svgRef.current)

        const box = document.querySelector('.svg-container'),
                width = box.offsetWidth,
                height = box.offsetHeight,
                rectWidth = width * 4/1000;

        //to remove previuos axes and the bar chart
        d3.selectAll('.axis')
            .transition()
            .duration(1000)
            .style('opacity', 0)
            .remove()

        d3.selectAll('.bar')
            .transition()
            .duration(1000)
            .attr('x', width / 2)
            .attr('y', height - 20)
            .attr('height', 0)
            .style('fill','#fff')
            .style('opacity', 0)
            .remove()

        //scales
        const minDate = d3.min(data, d => d.unix),
              maxDate = d3.max(data, d => d.unix),
              paddingDates = 30000000,
              maxPrice = d3.max(data, d => d.totalSpent)

        const xScale = d3.scaleTime()
                         .domain([minDate - paddingDates, maxDate + paddingDates])
                         .range([52, width - 10])
    
        const yScale = d3.scaleLinear()
                         .domain([0, maxPrice + maxPrice * 0.10])
                         .range([height - 20, 10])

        //axis
        const xAxis = svg.append('g')
                        .attr('transform', `translate(0, ${height - 20})`)
                        .attr('class', 'axis')
                        .style('fill','transparent')
                        .call(d3.axisBottom(xScale))

        const yAxis = svg.append('g')
                        .attr('transform', `translate(${50}, 0)`)
                        .attr('class', 'axis')
                        .style('fill','transparent')
                        .call(d3.axisLeft(yScale))

        //clip. For not drawing out of this area
        const clip = svg.append('defs').append('SVG:clipPath')
                                        .attr('id', 'clip')
                                        .append('SVG:rect')
                                        .attr('width', width )
                                        .attr('height', height )
                                        .attr('x', 50)
                                        .attr('y', 20);

        //g element to add elements
        const g = svg.append('g')
                     .attr('clip-path', 'url(#clip)')
                     .attr('class','zoom-g')

        //barchart
        g.selectAll('rect')
           .data(data)
           .join(
               enter => enter.append('rect')
                             .style('fill', '#fff')
                             .style('stroke', 'transparent')
                             .attr('x', d => xScale(d.unix))
                             .attr('rx', 0)
                             .attr('ry', 0)
                             .attr('y', height - 20)
                             .attr('height', 0)
                             .attr('id', d => `${d.date}`)
                             .attr('class', 'bar')
                             .transition().duration(1500).delay(1000)
                             .attr('x', d => xScale(d.unix))
                             .attr('y', d => yScale(d.totalSpent))
                             .attr('rx', 2)
                             .attr('ry', 2)
                             .attr('width', rectWidth)
                             .attr('height', d => height - 20 - yScale(d.totalSpent))
                             .style('fill', '#1a1a7e')
                             .style('stroke', '#fff8')    
           )

        //zoom
        const zoom = d3.zoom()
                        .duration(1000)
                        .scaleExtent([1, 5]) //limits the zoom
                        .translateExtent([[0,0],[width, height]]) //limits the panning
                        .on('zoom', updateChart)

        //area to make zoom
        svg.append('rect')
                        .attr('width', width - 50)
                        .attr('height', height - 20)
                        .style('fill', 'none')
                        .style('pointer-events', 'all')
                        .attr('transform', 'translate(50,0)')
                        .call(zoom);
        
        function updateChart(event){
            //scales
            const newX = event.transform.rescaleX(xScale)
            const newY = event.transform.rescaleY(yScale)

            xAxis.call(d3.axisBottom(newX))
            yAxis.call(d3.axisLeft(newY))

            //chart
            g.selectAll('rect')
                .attr('x', d => newX(d.unix))
                .attr('y', d => newY(d.totalSpent))
                .attr('rx', 2)
                .attr('ry', 2)
                .attr('width', rectWidth)
                .attr('height', d => height - 20 - newY(d.totalSpent))
        }
       
    }

    return (
        <div className='lineChart'>
            <h1>Latest {timeRange} transactions of {username} </h1>
            <div className='lineChart-buttons'>
                <div className='lineChart-buttons-row'>
                    <button onClick={() => setTimeRange('7-Days')} >7-days</button>
                    {timeRange === '7-Days' && 
                        <button onClick={() => setModalInfo(true)} name='info'>
                            <FontAwesomeIcon icon={faEllipsisH}/>
                        </button>
                    }
                </div>
                <div className='lineChart-buttons-row'> 
                    <button onClick={() => setTimeRange('1-Month')} >1-Month</button>
                    {timeRange === '1-Month' && 
                        <button onClick={() => setModalInfo(true)} name='info'>
                            <FontAwesomeIcon icon={faEllipsisH}/>
                        </button>
                    } 
                </div>
                <div className='lineChart-buttons-row'>
                    <button onClick={() => setTimeRange('3-Months')} >3-Months</button>
                    {timeRange === '3-Months' &&
                        <button onClick={() => setModalInfo(true)} name='info'>
                            <FontAwesomeIcon icon={faEllipsisH}/>
                        </button>
                    }
                </div>
                <div className='lineChart-buttons-row'>
                    <button onClick={() => setTimeRange('6-Months')} >6-Months</button>
                    {timeRange === '6-Months' &&
                        <button onClick={() => setModalInfo(true)} name='info'>
                            <FontAwesomeIcon icon={faEllipsisH}/>
                        </button>
                    }
                </div>
            </div>
            <div className='svg-container'>
                <svg 
                    ref={svgRef}
                    height={'100%'}
                    width={'100%'}
                ></svg>
            </div>
        </div>
    );
};

export default LineChart;