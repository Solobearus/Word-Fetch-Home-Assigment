import React from 'react'
import style from './Button.module.css'
import ButtonUI from '@material-ui/core/Button';

const Button = (props) => {
    return (
        <ButtonUI variant="contained" color="primary" onClick={props.click}>
            {props.value}
        </ButtonUI>
    )
}

export default Button
