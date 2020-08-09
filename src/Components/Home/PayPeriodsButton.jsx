import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons'
import styles from '../Main/styles'

class PayPeriodsButton extends Component {
    
    constructor(props) {
        super(props)

        this._transition = this._transition.bind(this)
    }

    _transition = () => {
        this.props.getPayPeriods()
        setTimeout(() => {this.props.transition("payPeriods")}, 250)
    }

    render() {
        const { classes } = this.props
        return (
            <div className="text-center">
              
                <Button 
                    onClick={this._transition}
                    variant="outlined" 
                    className={classes.button}>
                    <FontAwesomeIcon icon={faHourglassStart} />&nbsp;| Pay Periods
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(PayPeriodsButton)
