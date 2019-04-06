import React from 'react'
import style from './Container.module.css'
import Button from './Button/Button.jsx'
import Report from './Report/Report.jsx'

const Container = (props) => {

    let report = null;

    if(props.showReportToggle){
        report = <Report reportData = {props.reportData}></Report>
    }

    return (
        <div className={ style.Container }>
            <Button click={props.fetchWords} value="Fetch-words"></Button>
            <Button click={props.showReport} value="Show-report"></Button>
            {report}
        </div>
    )
}

export default Container
