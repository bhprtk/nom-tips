import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
import CustomTips from './CustomTips'

class Bartender extends Component {

    constructor(props) {
        super(props)

        this.state = {
            customTips: false
        }

        this._submitTips = this._submitTips.bind(this)
    }

    _submitTips = e => {
        const { value } = e.currentTarget
        this.props.addTips('bartender', value, 'total')
    }

    _customTips = () => {
        this.setState({ customTips: true })
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.tipsInputDisplay}>
                <h3 
                    style={{
                        color: '#8d6e63',
                        marginBottom: 40
                    }}>
                    How much are you tipping the bartender?
                </h3>
                
                <Button 
                    onClick={this._submitTips}
                    value={0.05}
                    className={classes.button}>5%</Button>
                
                {this.state.customTips ?
                    <CustomTips initialTip={5} submitTips={this._submitTips} />
                    :
                    <Button 
                        onClick={this._customTips}
                        className={classes.button}>Custom</Button>
                }

                <Button 
                    onClick={this._submitTips}
                    value={0}
                    className={classes.button}>No Bartender</Button>

            </div>
        )
    }
}

export default withStyles(styles)(Bartender)