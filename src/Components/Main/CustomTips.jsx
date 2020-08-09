import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = () => ({
    button: {
        border: '2px solid #8d6e63',
        color: '#8d6e63',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        width: 120,
        textTransform: 'Capitalize',
        '&:focus': {
          outline: 0
        },
    },
    action: {
        border: '2px solid #8d6e63',
        color: '#8d6e63',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
        height: 50,
        // width: 250,
        textTransform: 'Capitalize',
        '&:focus': {
          outline: 0
        },
    }
})

class CustomTips extends Component {

    constructor(props) {
        super(props)

        this.state = {
            tip: this.props.initialTip
        }

        this._add = this._add.bind(this)
        this._subtract = this._subtract.bind(this)
    }
    
    _add = () => {
        let tip = this.state.tip
        tip++
        if(tip < 100) {
            this.setState({ tip })
        }
    }

    _subtract = () => {
        let tip = this.state.tip
        tip--
        if(tip > 0) {
            this.setState({ tip })
        }    
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Button 
                    onClick={this._subtract}
                    className={classes.action}>-</Button>
                <Button 
                    onClick={this.props.submitTips}
                    value={this.state.tip / 100}
                    className={classes.button}>{this.state.tip}%</Button>
                <Button 
                    onClick={this._add}
                    className={classes.action}>+</Button>
            </div>
        )
    }
}

export default withStyles(styles)(CustomTips)