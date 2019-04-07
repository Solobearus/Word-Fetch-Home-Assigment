import React from 'react'
import ReportCard from './ReportCard/ReportCard.jsx'
import style from './Report.module.css'

const Report = (props) => {
    // console.log(props.reportData);
    let reportCards = [];
    (props.reportData || []).map((ReportElementsPerWord, indexPerWord) => { 

        reportCards.push(<ReportCard word={props.words[indexPerWord]} ReportElementsPerWord={ReportElementsPerWord} ></ReportCard>);
    })

    console.log(reportCards);
    
    return (
        <div className={ style.Report }>
            {reportCards}
        </div>
    )
}

export default Report
