import React from 'react'
import style from './ReportCard.module.css'
import ReportGraph from './ReportGraph/ReportGraph.jsx'

const ReportCard = (props) => {

    let dataTxt = []
    let dataGraph = []
    
    {(props.ReportElementsPerWord || []).map((ReportPerFilter, indexPerFilter) => { 
        dataGraph.push(ReportPerFilter);
        dataTxt.push(<p>{ReportPerFilter.amount} {ReportPerFilter.filter}</p>);
    })}

    return (
        <div className={ style.ReportCard }>
            <h3>{props.word}</h3>

            {dataTxt}
            <ReportGraph data={dataGraph}></ReportGraph>
        </div>
    )
}

export default ReportCard
