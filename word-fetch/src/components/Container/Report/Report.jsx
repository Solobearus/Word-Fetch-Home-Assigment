import React from 'react'
import style from './Report.module.css'

const Report = (props) => {
    return (
        <div className={ style.Report }>
            {(props.reportData || []).map((ReportElement, index) => (
                <p> 
                    {/* TODO: FIX THIS */}
                    
                </p>
            ))}
        </div>
    )
}

export default Report
