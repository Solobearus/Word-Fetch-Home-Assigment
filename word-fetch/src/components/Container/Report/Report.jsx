import React from 'react'
import style from './Report.module.css'

const Report = (props) => {
    // console.log(props.reportData);

    // for (let i = 0; i < props.reportData.length; i++) {
    //     console.log(props.reportData[i]);
    //     console.log(props.reportData[i].length);   
    // }

    // (props.reportData || []).map((ReportElementsPerWord, indexPerWord) => { 
    //     console.log(ReportElementsPerWord);
    //     console.log( Object.keys(ReportElementsPerWord).length);
        

    //     ReportElementsPerWord.map((ReportPerFilter, indexPerFilter) => { 
    //         console.log("test1");
    //         console.log(ReportPerFilter);
    //     })
    // })

    return (
        <div className={ style.Report }>
            
        </div>
    )
}

export default Report
