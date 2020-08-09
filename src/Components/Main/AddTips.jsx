import React, { Component } from 'react'
import NumPad from './NumPad'
import DisplayValue from './DisplayValue'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles';


class AddTips extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayValue: this.props.tips
        }

        this._click = this._click.bind(this)
        this._done = this._done.bind(this)
    }
    
    _click = e => {
        const { value } = e.currentTarget
        let displayValue = this.state.displayValue.toString()
        if(value === "del") {
            displayValue = displayValue.slice(0, -1)
        } else {
            if(displayValue.length < 3) {
                displayValue += value.toString()
            }
        }
        this.setState({ displayValue: Number(displayValue) })
    }

    _done = () => {
        setTimeout(() => {this.props.addTipsMade(this.state.displayValue)}, 250)
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.tipsInputDisplay}>
                <h3 
                    style={{
                        color: '#8d6e63',
                        marginBottom: 40,
                        marginTop: 20
                    }}>
                    How much did you make today?
                </h3>
                <DisplayValue displayValue={this.state.displayValue} />
                <NumPad 
                    click={this._click} 
                    done={this._done}
                />

            </div>
        )
    }
}

export default withStyles(styles)(AddTips)