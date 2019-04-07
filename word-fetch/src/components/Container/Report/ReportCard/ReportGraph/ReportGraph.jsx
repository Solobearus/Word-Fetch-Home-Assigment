import React from 'react'
import style from './ReportGraph.module.css'
import ChartistGraph from 'react-chartist'

const ReportGraph = (props) => {

    let labels = [];
    let series = [];
    props.data.forEach((data) => {
        labels.push(data.filter);
        series.push(data.amount);
    })

    var lineChartData = {
        labels: labels,
        series: [series]
    }
    var lineChartOptions = {
        low: 0,
        showArea: true
    }
    return (
        <ChartistGraph
            className={style.ReportGraph}
            data={lineChartData}
            type={'Bar'}
            options={lineChartOptions}
        />
    )
}

export default ReportGraph
